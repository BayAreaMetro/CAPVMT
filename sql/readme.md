### 2013 Plan Data

2013 Plan data is hosted on the `CAPVMT` database under the `CAPVMT` schema in the following tables:  

```
persons_2005_03_YYY
vmt_2005_03_YYY
persons_2010_03_YYY
vmt_2010_03_YYY
persons_2020_03_116
vmt_2020_03_116
persons_2030_03_116
vmt_2030_03_116
persons_2040_03_116
vmt_2040_03_116
```

Stored producedures and queries are used to produce view referenced in the queries that result in the tables found in the application front end. For convenience, and in order to determine which tables we need to rebuild, all queries to the database are pulled out and listed below:

```
dbo.County_Code_LU
Place_Lookup
Place_Lookup
VMT_Results 
CAPVMT.[PLACES_WGS84]
CAPVMT.[TAZ_PLACES_WGS84]
CAPVMT.[URBANTAZS_WGS84]
ScenarioYear 
VMT_Results 
```

### 2017 Plan Data. 

2017 Plan data is hosted on the `CAPVMT` database under the `CAPVMT` schema in the following tables:    

```
persons_2005_05_YYY
vmt_2005_05_YYY
persons_2010_06_YYY
vmt_2010_06_YYY
persons_2015_06_YYY
vmt_2015_06_YYY
persons_2020_06_694
vmt_2020_06_694
persons_2030_06_694
vmt_2030_06_694
persons_2040_06_694
vmt_2040_06_694
```

### SQL Update Procedures & Scripts. 

the /sql folder contains sql scripts used to create and update the data presented on the main data portal.

`vmtshares.sql` - this script takes a taz list and a model run number (and a place id) and returns a vmt results table

#### 2013 Data

`main_views.sql` - these are the views that are queried from the web application (by [this controller](https://github.com/BayAreaMetro/CAPVMT/blob/Development/client/app/data/data.controller.js))  
`update_vmtresults_table_2013.sql` - this script populates the main vmt table that `CAPVMT.VMT_Results` depends on

#### 2017 Data

`update_vmtresults_table_2017.sql` - this script populates the table that `CAPVMT.VMT_Results` depends on

