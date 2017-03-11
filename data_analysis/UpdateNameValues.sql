--Client requests changes to the naming convention for unincorporated areas
--CHeck source tables for values that need to be changed.
--set sql params
declare @id int
set @id = 16;


SELECT [objectid]
      ,[name]
      ,[id_short]
  FROM [CAPVMT].[City_Domain_Tbl]
  where id_short = @id
  order by objectid

SELECT [name]
      ,[id]      
  FROM [CAPVMT].[PLACES_GEO]
  where id = @id
  order by id



select Distinct [name]
      ,[id] From [CAPVMT].[PLACES_WGS84]
where id = @id
order by id

--set sql params
declare @name nvarchar(255);
declare @id int;
set @name = 'Berkeley';
set @id = 16;

update [CAPVMT].[City_Domain_Tbl]
set name = @name
where id_short = @id

update [CAPVMT].[PLACES_GEO]
set name = @name
where id = @id

update [CAPVMT].[PLACES_WGS84]
set name = @name
where id = @id
