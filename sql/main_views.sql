   ALTER VIEW CAPVMT.vmttaz AS SELECT
        CAPVMT.Places_Results_Tbl.placeid AS ID,
        CAPVMT.City_Domain_Tbl.name AS CityName,
        CAPVMT.TAZ_PLACES_GEO.taz_key,
        CAPVMT.TAZ_PLACES_GEO.Shape 
    FROM
        CAPVMT.Places_Results_Tbl 
    INNER JOIN
        CAPVMT.City_Domain_Tbl 
            ON CAPVMT.Places_Results_Tbl.placeid = CAPVMT.City_Domain_Tbl.id_short 
    LEFT OUTER JOIN
        CAPVMT.TAZ_PLACES_GEO 
            ON CAPVMT.Places_Results_Tbl.placeid = CAPVMT.TAZ_PLACES_GEO.City_Domain GO 


    ALTER VIEW capvmt.vmtplace as SELECT
        CAPVMT.Places_Results_Tbl.placeid AS ID,
        CAPVMT.City_Domain_Tbl.name AS CityName,
        --CAPVMT.PBA_CITIES_ALL1.Shape.ToString() as WKT CAPVMT.PBA_CITIES_ALL1.SHAPE 
    FROM
        CAPVMT.Places_Results_Tbl 
    INNER JOIN
        CAPVMT.City_Domain_Tbl 
            ON CAPVMT.Places_Results_Tbl.placeid = CAPVMT.City_Domain_Tbl.id_short 
    LEFT OUTER JOIN
        CAPVMT.PBA_CITIES_ALL1 
            ON CAPVMT.Places_Results_Tbl.placeid = CAPVMT.PBA_CITIES_ALL1.id GO 

    ALTER VIEW CAPVMT.VMT_Results AS SELECT
        TOP (100) PERCENT CASE (live_in_area) 
            WHEN 1 THEN 'Live in area' 
            WHEN 0 THEN 'Live out of area' 
            ELSE 'Other' 
        END AS Lives,
        CASE (work_in_area)                           
            WHEN 1 THEN 'Works in area' 
            WHEN 0 THEN 'Works out of area' 
            ELSE 'Non-worker' 
        END AS Works,
        CASE (live_in_area)                           
            WHEN 1 THEN 'A' 
            WHEN 0 THEN 'B' 
            ELSE 'C' 
        END AS SortOrder2,
        CASE (work_in_area) 
            WHEN 1 THEN 'D' 
            WHEN 0 THEN 'E' 
            ELSE 'F' 
        END AS SortOrder3,
        ROUND(CAPVMT.Places_Results_Tbl.vmt_within,
        0) AS Inside,
        ROUND(CAPVMT.Places_Results_Tbl.vmt_partial,
        0) AS Partially_In,
        ROUND(CAPVMT.Places_Results_Tbl.vmt_outside,
        0) AS Outside,
        ROUND(CAPVMT.Places_Results_Tbl.vmt_total,
        0) AS Total,
        CAPVMT.Places_Results_Tbl.placeid,
        CAPVMT.Places_Results_Tbl.tazlist,
        CAPVMT.Places_Results_Tbl.model_run,
        CAPVMT.Place_Lookup.CityName,
        CAPVMT.Places_Results_Tbl.vmt_total,
        CAPVMT.Places_Results_Tbl.persons 
    FROM
        CAPVMT.Places_Results_Tbl 
    INNER JOIN
        CAPVMT.Place_Lookup 
            ON CAPVMT.Places_Results_Tbl.placeid = CAPVMT.Place_Lookup.ID 
    ORDER BY
        CAPVMT.Place_Lookup.CityName,
        CASE (live_in_area) 
            WHEN 1 THEN 'A' 
            WHEN 0 THEN 'B' 
            ELSE 'C' 
        END,
        CASE (work_in_area)                           
            WHEN 1 THEN 'D' 
            WHEN 0 THEN 'E' 
            ELSE 'F' 
        END GO 