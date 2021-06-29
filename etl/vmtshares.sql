-- =============================================
-- Author:		Lisa Zorn - Edited by sfoo
-- Create date: December 29, 2014
-- Description:	VMT Shares
-- =============================================
CREATE PROCEDURE [CAPVMT].[vmtshares_DBA_2017]
	-- Add the parameters for the stored procedure here
	@placeid nvarchar(255),
	@tazlist nvarchar(MAX),
    @modelrun nvarchar(20),
	@debug bit=0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @persons_table varchar(50),
	        @vmt_table varchar(50),
			@sql nvarchar(MAX),
			@placename nvarchar(255),
			@year nchar(4);


	SELECT @placename=[name]
	from [CAPVMT].[City_Domain_Tbl]
	where [id_short]=@placeid


    -- just being ABSOLUTELY SURE that modelrun is AOK
	IF @modelrun = '2010_06_YYY'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2010_06_YYY]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2010_06_YYY]';
	END
	ELSE IF @modelrun = '2005_05_YYY'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2005_05_YYY]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2005_05_YYY]';
	END
	ELSE IF @modelrun = '2015_06_YYY'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2015_06_YYY]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2015_06_YYY]';
	END
	ELSE IF @modelrun = '2020_06_694'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2020_06_694]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2020_06_694]';
	END
	ELSE IF @modelrun = '2030_06_694_Amd1'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2030_06_694_Amd1]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2030_06_694_Amd1]';
	END
	ELSE IF @modelrun = '2040_06_694_Amd1'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2040_06_694_Amd1]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2040_06_694_Amd1]';
	END
	ELSE IF @modelrun = '2010_03_YYY'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2010_03_YYY]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2010_03_YYY]';
	END
	ELSE IF @modelrun = '2005_03_YYY'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2005_03_YYY]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2005_05_YYY]';
	END
	ELSE IF @modelrun = '2020_03_116'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2020_03_116]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2020_03_116]';
	END
	ELSE IF @modelrun = '2030_03_116'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2030_03_116]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2030_03_116]';
	END
	ELSE IF @modelrun = '2040_03_116'
	BEGIN
	  SELECT @persons_table = '[CAPVMT].[persons_2040_03_116]';
	  SELECT @vmt_table = '[CAPVMT].[vmt_2040_03_116]';
	END
	ELSE
	BEGIN
	  RAISERROR(N'Invalid model run specified: %s', -- message text
		         11, -- severity
		         -1,  -- state
				 @modelrun);
	END

	create table #temptazs (id int NULL);
	exec CAPVMT.unpack_with_union @tazlist, '#temptazs'

	alter table #temptazs add in_area int NOT NULL DEFAULT (1);
	insert into #temptazs (id, in_area) values (0, -1);

	-- count up the people by where they live and work
	select @sql ='
	select l.in_area as live_in_area, w.in_area as work_in_area, sum(x.freq) as persons
	into #tempPersonsHomeWork from (' + @persons_table + ' as x
	  left join #temptazs as l on (l.id = x.taz) 
	  left join #temptazs as w on (w.id = x.WorkLocation))
	group by l.in_area, w.in_area;
	';

	-- set NULL values to 0
	select @sql = @sql + '
	update #tempPersonsHomeWork set live_in_area = coalesce(live_in_area, 0);
	update #tempPersonsHomeWork set work_in_area = coalesce(work_in_area, 0);
	';

	-- count of the different types of VMT by live/work/origin/dest categories
	select @sql = @sql + '
	select l.in_area as live_in_area,
	       w.in_area as work_in_area,
		   sum(vmt) as vmt
	into #tempVMT
	from (' + @vmt_table + ' as x
	  left join #temptazs as l on (l.id = x.taz)
	  left join #temptazs as w on (w.id = x.WorkLocation))
	group by l.in_area, w.in_area;
	update #tempVMT set live_in_area = coalesce(live_in_area, 0);
	update #tempVMT set work_in_area = coalesce(work_in_area, 0);
	';

	select @sql = @sql + '
	select l.in_area as live_in_area,
	       w.in_area as work_in_area,
		   sum(vmt) as vmt
	into #tempVMT_within
	from (' + @vmt_table + ' as x
	  left join #temptazs as l on (l.id = x.taz)
	  left join #temptazs as w on (w.id = x.WorkLocation)
	  left join #temptazs as o on (o.id = x.orig_taz)
	  left join #temptazs as d on (d.id = x.dest_taz))
	where (o.in_area = 1 and d.in_area = 1)
	group by l.in_area, w.in_area;
	update #tempVMT_within set live_in_area = coalesce(live_in_area, 0);
	update #tempVMT_within set work_in_area = coalesce(work_in_area, 0);

	select l.in_area as live_in_area,
	       w.in_area as work_in_area,
		   sum(vmt) as vmt
	into #tempVMT_partial
	from (' + @vmt_table + ' as x
	  left join #temptazs as l on (l.id = x.taz)
	  left join #temptazs as w on (w.id = x.WorkLocation)
	  left join #temptazs as o on (o.id = x.orig_taz)
	  left join #temptazs as d on (d.id = x.dest_taz))
	where ((o.in_area = 1 and d.in_area IS NULL) or (o.in_area IS NULL and d.in_area = 1))
	group by l.in_area, w.in_area;
	update #tempVMT_partial set live_in_area = coalesce(live_in_area, 0);
	update #tempVMT_partial set work_in_area = coalesce(work_in_area, 0);

	select l.in_area as live_in_area,
	       w.in_area as work_in_area,
		   sum(vmt) as vmt
	into #tempVMT_outside
	from (' + @vmt_table + ' as x
	  left join #temptazs as l on (l.id = x.taz)
	  left join #temptazs as w on (w.id = x.WorkLocation)
	  left join #temptazs as o on (o.id = x.orig_taz)
	  left join #temptazs as d on (d.id = x.dest_taz))
	where (o.in_area IS NULL and d.in_area IS NULL)
	group by l.in_area, w.in_area;
	update #tempVMT_outside set live_in_area = coalesce(live_in_area, 0);
	update #tempVMT_outside set work_in_area = coalesce(work_in_area, 0);

    /*-- select everything together to return
	SELECT p.live_in_area,
	       p.work_in_area,
		   persons,
	       v1.vmt as vmt_total,
		   v2.vmt as vmt_within,
		   v3.vmt as vmt_partial,
		   v4.vmt as vmt_outside
	from (#tempPersonsHomeWork as p
	  left outer join #tempVMT as v1 
	    on (p.live_in_area = v1.live_in_area and
	        p.work_in_area = v1.work_in_area)
	  left outer join #tempVMT_within as v2
	    on (p.live_in_area = v2.live_in_area and
		    p.work_in_area = v2.work_in_area)
	  left outer join #tempVMT_partial as v3
	    on (p.live_in_area = v3.live_in_area and
		    p.work_in_area = v3.work_in_area)
 	  left outer join #tempVMT_outside as v4
	    on (p.live_in_area = v4.live_in_area and
		    p.work_in_area = v4.work_in_area))
	order by p.live_in_area desc, p.work_in_area DESC */
	
	--select everything together and create a table of results

	insert into CAPVMT.Places_Results_Tbl (
	           live_in_area,
			   work_in_area,
			   persons,
			   vmt_total,
			   vmt_within,
			   vmt_partial,
			   vmt_outside,
			   placeid,
			   tazlist,
			   model_run)
	select p.live_in_area,
			   p.work_in_area,
			   persons,
			   v1.vmt as vmt_total,
			   v2.vmt as vmt_within,
			   v3.vmt as vmt_partial,
			   v4.vmt as vmt_outside, '+
			   @placeid +' as placeid,'''+
			   @tazlist+ ''' as tazlist,
			   '''+@modelrun+''' as model_run
	from (#tempPersonsHomeWork as p
		  left outer join #tempVMT as v1 
			on (p.live_in_area = v1.live_in_area and
				p.work_in_area = v1.work_in_area)
		  left outer join #tempVMT_within as v2
			on (p.live_in_area = v2.live_in_area and
				p.work_in_area = v2.work_in_area)
		  left outer join #tempVMT_partial as v3
			on (p.live_in_area = v3.live_in_area and
				p.work_in_area = v3.work_in_area)
 		  left outer join #tempVMT_outside as v4
			on (p.live_in_area = v4.live_in_area and
				p.work_in_area = v4.work_in_area))
	order by p.live_in_area desc, p.work_in_area DESC';

	--will write @placeid into an integer field from nvarchar(255) in final output table -sfoo

    if @debug=1 print @sql
	exec(@sql)
	

END
GO
