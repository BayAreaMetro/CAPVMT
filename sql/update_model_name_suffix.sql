USE CAPVMT
GO
EXEC sp_rename 'CAPVMT.VMT_Results', VMT_Results_View
GO

SELECT *
  INTO VMT_Results
FROM VMT_Results_View

USE CAPVMT
GO
UPDATE CAPVMT.VMT_Results 
SET     model_run =  CASE  
                        WHEN model_run LIKE '2005_05_YYY' Then '2005_05_003'
                        WHEN model_run LIKE '2010_06_YYY' Then '2010_06_003'
                        WHEN model_run LIKE '2015_06_YYY' Then '2015_06_002'
                        ELSE model_run
                    END 
WHERE   model_run LIKE '%YYY'

USE CAPVMT
GO
DROP VIEW CAPVMT.ScenarioYear;
GO
Select Distinct
  CASE(model_run)
  When '2005_05_003' Then 2005
  When '2010_06_003' Then 2010
  When '2015_06_002' Then 2015
  When '2020_06_694' Then 2020
  When '2030_06_694_Amd1' Then 2030
  When '2040_06_694_Amd1' Then 2040 END as text,
  model_run as value
INTO CAPVMT.ScenarioYear
  FROM CAPVMT.VMT_Results
GO