# %%
"""ETL for VMT Results

Contributors: Elliot Huang
"""

# %%
import time
import os
from multiprocessing import Pool

import pandas as pd

# %%
class VMTResultsCalculator():
    """Calculates VMT results tables. 

    General usage:
        0. Instantiate instance of this class
        1. Set the TAZ/county and TAZ/city correspondence tables
        2. Set the place_lookup table
        3. Set the model run information, including: model_run_id, vmt_table, and persons_table
        4. Once the above are set, the VMT shares can be calculated for a given place_id
    """

    def __init__(self):
        self.taz_county_table = None
        self.taz_city_table = None

        self.place_lookup_table = None

        self.model_run = None
        self.vmt_table = None
        self.persons_table = None
    
    def set_taz_correspondence_tables(self, county_table, city_table):
        """sets the TAZ coreespondence tables for counties and cities

        args: 
            county_table(pd.DataFrame): county to TAZ correspondence table
            city_table(pd.DataFrame): city to TAZ correspondence table
        """
        self.taz_county_table = county_table
        self.taz_city_table = city_table

    def set_place_lookup_table(self, place_lookup_table):
        """sets the place_lookup table
        
        args:
            place_lookup_table (pd.DataFrame): place lookup table between placeid and cityname
        """
        self.place_lookup_table = place_lookup_table

    def set_model_run(self, model_run_id, vmt_table, persons_table):
        """sets the model run and the model runs's associated tables

        args:
            model_run_id (str): the id of the model_run 
            vmt_table (pd.DataFrame): vmt_table for the model run
            persons_table (pd.DataFrame): persons_table for the model run
        """
        self.model_run = model_run_id
        self.vmt_table = vmt_table
        self.persons_table = persons_table
    
    def calc_vmt_table_masks(self, taz_list):
        """compute boolean masks for use in subsetting the VMT table"""

        if self.vmt_table is None:
            raise ValueError("VMT table not initialized")

        # lives in/out of the place_id 
        v_live_in = self.vmt_table["taz"].isin(taz_list)
        v_live_out = ~v_live_in

        # work in/out of the place_id, or not a worker
        v_work_in = self.vmt_table["WorkLocation"].isin(taz_list)
        v_work_non = self.vmt_table["WorkLocation"] == 0
        v_work_out = ~v_work_in & ~v_work_non

        # trip origin in/out of the place_id 
        v_orig_in = self.vmt_table["orig_taz"].isin(taz_list)
        v_orig_out = ~v_orig_in

        # trip destination in/out of the place_id 
        v_dest_in = self.vmt_table["dest_taz"].isin(taz_list)
        v_dest_out = ~v_dest_in

        # suggest using the "v_" prefix to indicate the mask works with the VMT table
        return v_live_in, v_live_out, v_work_in, v_work_out, v_work_non, v_orig_in, v_orig_out, v_dest_in, v_dest_out

    def calc_persons_table_masks(self, taz_list):
        """compute boolean masks for use in subsetting the Persons table"""

        if self.persons_table is None:
            raise ValueError("Persons table not initialized")

        # persons lives in / out of the place_id
        p_live_in = self.persons_table["taz"].isin(taz_list)
        p_live_out = ~p_live_in

        # persons in/out of the place_id, or not a worker
        p_work_in = self.persons_table["WorkLocation"].isin(taz_list)
        p_work_non = self.persons_table["WorkLocation"] == 0
        p_work_out = ~p_work_in & ~p_work_non

        # suggest using the "p_" prefix to indicate the mask works with the Persons table
        return p_live_in, p_live_out, p_work_in, p_work_out, p_work_non

    def lookup_taz_list(self, place_id):
        """look up the taz list from the correct table"""

        if (self.taz_county_table is None) or (self.taz_city_table is None):
            raise ValueError("TAZ correspondence tables not initialized")

        # HARD CODED ASSUMPTION: all cities have place_id < 6000, all counties have place_id >= 6000
        if place_id < 6000:
            taz_list = tuple([int(taz) for taz in self.taz_city_table.loc[place_id, "Taz_List"].split(',')])
        else:
            taz_list = tuple([int(taz) for taz in self.taz_county_table.loc[place_id, "Taz_List"].split(',')])
        return taz_list

    def calc_vmt_shares(self, place_id):
        """calculate vmt shares for the given place_id"""

        # check to see if appropraite tables are initialized 
        if (self.taz_county_table is None) or (self.taz_city_table is None):
            raise ValueError("TAZ correspondence tables not initialized")
        if self.place_lookup_table is None:
            raise ValueError("Place Lookup table not initialized")
        if self.vmt_table is None:
            raise ValueError("VMT table not initialized")        
        if self.persons_table is None:
            raise ValueError("Persons table not initialized")

        # lookup taz_list
        taz_list = self.lookup_taz_list(place_id)

        # precompute masks for VMT table
        v_live_in, v_live_out, v_work_in, v_work_out, v_work_non, v_orig_in, v_orig_out, v_dest_in, v_dest_out = self.calc_vmt_table_masks(taz_list)

        # precompute masks for Persons table
        p_live_in, p_live_out, p_work_in, p_work_out, p_work_non = self.calc_persons_table_masks(taz_list)

        # ## apply the boolean masks to get the VMT shares (there are 6 combinations)

        # 1. calculate VMT for Live In / Work In
        inside = self.vmt_table[v_live_in & v_work_in & v_orig_in & v_dest_in].vmt.sum()
        outside = self.vmt_table[v_live_in & v_work_in & v_orig_out & v_dest_out].vmt.sum()
        partially_in = self.vmt_table[v_live_in & v_work_in & ((v_orig_in & v_dest_out) | (v_orig_out & v_dest_in))].vmt.sum()
        total = inside + outside + partially_in 
        persons = self.persons_table[p_live_in & p_work_in].freq.sum()

        live_in_work_in = {
            "Lives": "Live in area",
            "Works": "Works in area",
            "SortOrder2": "A",
            "SortOrder3": "D",
            "Inside": inside,
            "Partially_In": partially_in,
            "Outside": outside,
            "Total": total,
            "Persons": persons
        }

        # 2. calculate VMT for Live In / Work Out
        inside = self.vmt_table[v_live_in & v_work_out & v_orig_in & v_dest_in].vmt.sum()
        outside = self.vmt_table[v_live_in & v_work_out & v_orig_out & v_dest_out].vmt.sum()
        partially_in = self.vmt_table[v_live_in & v_work_out & ((v_orig_in & v_dest_out) | (v_orig_out & v_dest_in))].vmt.sum()
        total = inside + outside + partially_in 
        persons = self.persons_table[p_live_in & p_work_out].freq.sum()

        live_in_work_out = {
            "Lives": "Live in area",
            "Works": "Works out of area",
            "SortOrder2": "A",
            "SortOrder3": "E",
            "Inside": inside,
            "Partially_In": partially_in,
            "Outside": outside,
            "Total": total,
            "Persons": persons
        }

        # 3. calculate VMT for Live In / Non Worker
        inside = self.vmt_table[v_live_in & v_work_non & v_orig_in & v_dest_in].vmt.sum()
        outside = self.vmt_table[v_live_in & v_work_non & v_orig_out & v_dest_out].vmt.sum()
        partially_in = self.vmt_table[v_live_in & v_work_non & ((v_orig_in & v_dest_out) | (v_orig_out & v_dest_in))].vmt.sum()
        total = inside + outside + partially_in 
        persons = self.persons_table[p_live_in & p_work_non].freq.sum()

        live_in_work_non = {
            "Lives": "Live in area",
            "Works": "Non-worker",
            "SortOrder2": "A",
            "SortOrder3": "F",
            "Inside": inside,
            "Partially_In": partially_in,
            "Outside": outside,
            "Total": total,
            "Persons": persons
        }

        # 4. calculate VMT for Live out / Work In
        inside = self.vmt_table[v_live_out & v_work_in & v_orig_in & v_dest_in].vmt.sum()
        outside = self.vmt_table[v_live_out & v_work_in & v_orig_out & v_dest_out].vmt.sum()
        partially_in = self.vmt_table[v_live_out & v_work_in & ((v_orig_in & v_dest_out) | (v_orig_out & v_dest_in))].vmt.sum()
        total = inside + outside + partially_in 
        persons = self.persons_table[p_live_out & p_work_in].freq.sum()

        live_out_work_in = {
            "Lives": "Live out of area",
            "Works": "Works in area",
            "SortOrder2": "B",
            "SortOrder3": "D",
            "Inside": inside,
            "Partially_In": partially_in,
            "Outside": outside,
            "Total": total,
            "Persons": persons
        }

        # 5. calculate VMT for Live out / Work Out
        inside = self.vmt_table[v_live_out & v_work_out & v_orig_in & v_dest_in].vmt.sum()
        outside = self.vmt_table[v_live_out & v_work_out & v_orig_out & v_dest_out].vmt.sum()
        partially_in = self.vmt_table[v_live_out & v_work_out & ((v_orig_in & v_dest_out) | (v_orig_out & v_dest_in))].vmt.sum()
        total = inside + outside + partially_in 
        persons = self.persons_table[p_live_out & p_work_out].freq.sum()

        live_out_work_out = {
            "Lives": "Live out of area",
            "Works": "Works out of area",
            "SortOrder2": "B",
            "SortOrder3": "E",
            "Inside": inside,
            "Partially_In": partially_in,
            "Outside": outside,
            "Total": total,
            "Persons": persons
        }

        # 6. calculate VMT for Live out / Non Worker
        inside = self.vmt_table[v_live_out & v_work_non & v_orig_in & v_dest_in].vmt.sum()
        outside = self.vmt_table[v_live_out & v_work_non & v_orig_out & v_dest_out].vmt.sum()
        partially_in = self.vmt_table[v_live_out & v_work_non & ((v_orig_in & v_dest_out) | (v_orig_out & v_dest_in))].vmt.sum()
        total = inside + outside + partially_in 
        persons = self.persons_table[p_live_out & p_work_non].freq.sum()

        live_out_work_non = {
            "Lives": "Live out of area",
            "Works": "Non-worker",
            "SortOrder2": "B",
            "SortOrder3": "F",
            "Inside": inside,
            "Partially_In": partially_in,
            "Outside": outside,
            "Total": total,
            "Persons": persons
        }

        # compile the results, add some other columns to complete
        df = pd.DataFrame([
            live_in_work_in, 
            live_in_work_out, 
            live_in_work_non, 
            live_out_work_in, 
            live_out_work_out, 
            live_out_work_non
        ])
        df = df.round()
        df['placeid'] = place_id
        df['tazlist'] = ','.join([str(taz) for taz in taz_list])
        df['model_run'] = self.model_run
        df['CityName'] = self.place_lookup_table.loc[place_id,'CityName']

        return df
    
# %%
def calc_vmt_results(model_run):
    """Calculates the VMT results for the given model_run.

    This function is intended to be run concurrently in a multiprocess.Pool

    Args:
        model_run (str): The name of the model run
    
    Returns:
        vmt_results (pd.DataFrame): the VMT results table
    """
    print(f"PID:{os.getpid()} {time.ctime()}  START: model run '{model_run}'")

    # download lookup tables
    print(f"PID:{os.getpid()} {time.ctime()}  Downloading TAZ/county correspondence table")
    taz_county_table = pd.read_csv("./data/CAPVMT_TAZ_County_Correspondence_TBL.csv", index_col="County_Domain")

    print(f"PID:{os.getpid()} {time.ctime()}  Downloading TAZ/city correspondence table")
    taz_city_table = pd.read_csv("./data/CAPVMT_TAZ_Places_Correspondence_TBL.csv", index_col="City_Domain")

    print(f"PID:{os.getpid()} {time.ctime()}  Downloading Place Name Lookup table")
    place_lookup_table = pd.read_csv("./data/CAPVMT_Place_Lookup.csv", index_col="placeid")

    # download the vmt table
    print(f"PID:{os.getpid()} {time.ctime()}  Downloading VMT table for model run '{model_run}'")
    vmt_table = pd.read_csv(f"./data/vmt_{model_run}.csv")
    
    # download the persons table
    print(f"PID:{os.getpid()} {time.ctime()}  Downloading Persons table for model run '{model_run}'")
    persons_table = pd.read_csv(f"./data/persons_{model_run}.csv")

    # instantiate vmt_calculator
    vmt_calculator = VMTResultsCalculator()

    # set the lookup tables
    vmt_calculator.set_taz_correspondence_tables(county_table=taz_county_table, city_table=taz_city_table)
    vmt_calculator.set_place_lookup_table(place_lookup_table=place_lookup_table)

    # set the vmt and persons tables in the vmt calculator
    vmt_calculator.set_model_run(model_run_id=model_run, vmt_table=vmt_table, persons_table=persons_table)

    results = []

    # iterate through the list of cities, calculate vmt shares, collect in results list
    for city_id in taz_city_table.index:
        print(f"PID:{os.getpid()} {time.ctime()}  Calculating VMT shares for city '{city_id}'")
        df = vmt_calculator.calc_vmt_shares(place_id=city_id)
        results.append(df)
    
    # iterate through the list of counties, calculate vmt shares, collect in results list
    for county_id in taz_county_table.index:
        print(f"PID:{os.getpid()} {time.ctime()}  Calculating VMT shares for county '{county_id}'")
        df = vmt_calculator.calc_vmt_shares(place_id=county_id)
        results.append(df)

    vmt_results = pd.concat(results).sort_values(by=['CityName', 'model_run', 'SortOrder2', 'SortOrder3']).reset_index(drop=True)

    print(f"PID:{os.getpid()} {time.ctime()}  END: model run '{model_run}'")

    return vmt_results

# %%
def calc_all_vmt_results_concurrent():
    """Calculates the VMT_Results for all model_runs, cities, and counties. 
    
    This function steps through each of the model runs, cities, and counties calculate the VMT shares.
    The processing is done concurrently for each of the 6 model runs. 
    
    Returns:
        vmt_results (pd.DataFrame): the VMT results table
    """
    model_runs = (
        "2005_05_YYY",
        "2010_06_YYY",
        "2015_06_YYY",
        "2020_06_694",
        "2030_06_694_Amd1",
        "2040_06_694_Amd1"
    )

    # calculate the vmt results for the 6 model runs concurrently
    with Pool() as pool:
        results = pool.map(calc_vmt_results, model_runs)

    vmt_results = pd.concat(results)

    return vmt_results

# %%
def calc_all_vmt_results_sequential():
    """Calculates the VMT_Results for all model_runs, cities, and counties. 
    
    This function steps through each of the model runs, cities, and counties sequentially to calculate
    the VMT shares.

    Recommended to NOT use this method and use the concurrent version instead
    
    Returns:
        vmt_results (pd.DataFrame): the VMT results table
    """
    # download lookup tables
    print(f"{time.ctime()}  Downloading TAZ/county correspondence table")
    taz_county_table = pd.read_csv("./data/CAPVMT_TAZ_County_Correspondence_TBL.csv", index_col="County_Domain")

    print(f"{time.ctime()}  Downloading TAZ/city correspondence table")
    taz_city_table = pd.read_csv("./data/CAPVMT_TAZ_Places_Correspondence_TBL.csv", index_col="City_Domain")

    print(f"{time.ctime()}  Downloading Place Name Lookup table")
    place_lookup_table = pd.read_csv("./data/CAPVMT_Place_Lookup.csv", index_col="placeid")

    # instantiate vmt_calculator and set the lookup tables, which will be the same for all model runs
    vmt_calculator = VMTResultsCalculator()
    vmt_calculator.set_taz_correspondence_tables(county_table=taz_county_table, city_table=taz_city_table)
    vmt_calculator.set_place_lookup_table(place_lookup_table=place_lookup_table)

    model_runs = (
        "2005_05_YYY",
        "2010_06_YYY",
        "2015_06_YYY",
        "2020_06_694",
        "2030_06_694_Amd1",
        "2040_06_694_Amd1"
    )

    # list to store intermediate results
    results = []

    # iterate through the model runs and calculate vmt shares
    for m in model_runs:
        print(f"{time.ctime()}  START: model run '{m}'")

        # download the vmt and persons tables, which are specific for each model run
        print(f"{time.ctime()}  Downloading VMT table for model run '{m}'")
        vmt_table = pd.read_csv(f"./data/vmt_{m}.csv")
        print(f"{time.ctime()}  Downloading Persons table for model run '{m}'")
        persons_table = pd.read_csv(f"./data/persons_{m}.csv")

        # set the vmt and persons tables in the vmt calculator
        vmt_calculator.set_model_run(model_run_id=m, vmt_table=vmt_table, persons_table=persons_table)

        # iterate through the list of cities, calculate vmt shares, collect in results list
        for city_id in taz_city_table.index:
            print(f"{time.ctime()}  Calculating VMT shares for city '{city_id}'")
            df = vmt_calculator.calc_vmt_shares(place_id=city_id)
            results.append(df)
        
        # iterate through the list of counties, calculate vmt shares, collect in results list
        for county_id in taz_county_table.index:
            print(f"{time.ctime()}  Calculating VMT shares for county '{county_id}'")
            df = vmt_calculator.calc_vmt_shares(place_id=county_id)
            results.append(df)

        print(f"{time.ctime()}  END: model run '{m}'\n")

    vmt_results = pd.concat(results).sort_values(by=['CityName', 'model_run', 'SortOrder2', 'SortOrder3']).reset_index(drop=True)

    return vmt_results

# %%
def main():
    # Method 1: Concurrent Calculation of VMT results
    vmt_results_new = calc_all_vmt_results_concurrent()

    # Method 2: Sequential Calculation of VMT results
    # This method is slower and takes 4x to 6x longer than the concurrent processing method
    # Only use this if the concurrent method doesn't work for some reason
    # vmt_results_new = calc_all_vmt_results_sequential()

    # Output final results
    vmt_results_new.to_csv("vmt_results.csv", index=False)

# %%
if __name__ == '__main__':
    main()

# %%

# %%
