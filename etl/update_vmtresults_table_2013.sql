---This sql script will Delete all rows from [Places_Results_Tbl]

Delete From [CAPVMT].[Places_Results_Tbl]

Process place level results and insert into [Places_Results_Tbl]
--Run for City Places (198)
declare @placeid int = 0;
declare @lastid int;
declare	@tazlist nvarchar(max);


--Begin an infinite loop
while (1=1)

	begin
	    --Set var to help determine when all records have been processed
		set @lastid=@placeid;

		--Increments the placeid to the next record
		select top 1 @placeid=city_domain
		from [CAPVMT].[TAZ_Places_Correspondence_TBL]
		where city_domain>@placeid
		order by city_domain
	
		print @placeid

		--Break out of the loop after it processes the last record
		if @placeid=@lastid break;

		--Select the tazs that belong to the current placeid
		select @tazlist=taz_list
		from [CAPVMT].[TAZ_Places_Correspondence_TBL]
		where city_domain=@placeid

		declare @sql nvarchar(max);
		
		--Must cast place id from int to char because the dynamic sql will try to add the values instead of concatenate!  
		--Could be better work around, not sure.  -sfoo
		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2005_03_YYY'''
		print @sql
		exec sp_executesql @sql

		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2010_03_YYY'''
		print @sql
		exec sp_executesql @sql

		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2020_03_116'''
		print @sql
		exec sp_executesql @sql

		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2030_03_116'''
		print @sql
		exec sp_executesql @sql

		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2040_03_116'''
		print @sql
		exec sp_executesql @sql

	End



--Run for County Places (9)
declare @placeid int = 0;
declare @lastid int;
declare	@tazlist nvarchar(max);


--Begin an infinite loop
while (1=1)

	begin
	    --Set var to help determine when all records have been processed
		set @lastid=@placeid;

		--Increments the placeid to the next record
		select top 1 @placeid=county_domain
		from [CAPVMT].[TAZ_County_Correspondence_TBL]
		where county_domain>@placeid
		order by county_domain
	
		print @placeid

		--Break out of the loop after it processes the last record
		if @placeid=@lastid break;

		--Select the tazs that belong to the current placeid
		select @tazlist=taz_list
		from [CAPVMT].[TAZ_County_Correspondence_TBL]
		where county_domain=@placeid

		declare @sql nvarchar(max);
		
		--Must cast place id from int to char because the dynamic sql will try to add the values instead of concatenate!  
		--Could be better work around, not sure.  -sfoo
		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2005_03_YYY'''
		print @sql
		exec sp_executesql @sql

		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2010_03_YYY'''
		print @sql
		exec sp_executesql @sql

		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2020_03_116'''
		print @sql
		exec sp_executesql @sql

		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2030_03_116'''
		print @sql
		exec sp_executesql @sql

		set @sql= '[CAPVMT].[vmtshares_DBA] ' +cast(@placeid as nvarchar(255))+', '''+@tazlist+''', ''2040_03_116'''
		print @sql
		exec sp_executesql @sql

	End