path <- "/Users/tommtc/Box/DataViz\ Projects/Data\ Analysis\ and\ Visualization/Vehicle\ Miles\ Traveled\ Data\ Portal\ -\ 2018\ Update/"
df13_filename <- "vmt_results_2013.csv"
df17_filename <- "vmt_results_2017.csv"

library(readr)
df13 <- read_csv(paste0(path,df13_filename))
df17 <- read_csv(paste0(path,df17_filename),
                 col_types = cols(
                   Lives = col_character(),
                   Works = col_character(),
                   SortOrder2 = col_character(),
                   SortOrder3 = col_character(),
                   Inside = col_integer(),
                   Partially_In = col_integer(),
                   Outside = col_integer(),
                   Total = col_integer(),
                   placeid = col_integer(),
                   tazlist = col_character(),
                   model_run = col_character(),
                   CityName = col_character(),
                   vmt_total = col_double(),
                   persons = col_integer()
                 ))

df17$Population_Segment <- paste0(df17$Lives,"-",df17$Works) 
df17$Entirely_Within <- df17$Inside
df17$Partially_Within <- df17$Partially_In
df17$Entirely_Outside <- df17$Outside
df17$VMT_Per_Capita <- df17$Total/df17$persons

burlingame_id <- 28
bg17 <- df17[df17['placeid']==burlingame_id,]


bg_summary <- bg17[c('Population_Segment','persons','model_run','Entirely_Within','Partially_Within','Entirely_Outside','VMT_Per_Capita')]

library(dplyr)
bg_summary <- arrange(bg_summary,model_run,persons)

write_csv(bg_summary, file("Burlingame - PBA 2040 (2017) Non-commercial Passenger Vehicle Miles Traveled.csv"))


bg13 <- df13[df13['placeid']==burlingame_id,]
bg17 <- df17[df17['placeid']==burlingame_id,]

columns_of_interest<-c('Lives',
                       'Works',
                       'CityName',
                       'model_run',
                       'persons',
                       'Inside',
                       'Partially_In',
                       'Outside',
                       'vmt_total',
                       'placeid')

calculated_columns = c('persons',
             'Inside',
             'Partially_In',
             'Outside',
             'vmt_total')

named_columns <- c('Lives',
                  'Works',
                  'CityName',
                  'model_run')

bg13 <- arrange(bg13,Lives,Works,CityName,model_run)
bg17 <- arrange(bg17,Lives,Works,CityName,model_run)

#some checks
#expected_change from land use
#http://2040.planbayarea.org/sites/default/files/2017-07/Land_Use_Modeling_PBA2040_Supplemental%20Report_7-2017.pdf
expected_change_households <- 1300
expected_change_employment <- 14600

#total live in area population in 2040 in 2017 PBA
bgpopPBA2017_2040<- sum(bg17[bg17$Lives=="Live in area" 
                             & bg17$model_run=="2040_06_694_Amd1",c('persons')])
bgpopPBA2017_2010<- sum(bg17[bg17$Lives=="Live in area" 
                             & bg17$model_run=="2010_06_YYY",c('persons')])

#model change in persons for jurisdiction
print(bgpopPBA2017_2040 - bgpopPBA2017_2010)
#different by 3k

#employment
bgempPBA2017_2040<- sum(bg17[bg17$Works=="Works in area" & bg17$model_run=="2040_06_694_Amd1",c('persons')])
bgempPBA2017_2010<- sum(bg17[bg17$Works=="Works in area" & bg17$model_run=="2010_06_YYY",c('persons')])
print(bgempPBA2017_2040 - bgempPBA2017_2010)
#different by a few hundred

bg_compare <- bg17[named_columns]

#sanity, heads up check
#2 fields manually checked out
#bigdf <- cbind(bg_compare,bg13[calculated_columns], bg17[calculated_columns], )

comparison_df <- cbind(bg_compare,bg17[calculated_columns]-bg13[calculated_columns])

View(comparison_df)

persons_change <- arrange(persons_change,persons)

persons_change[persons_change$Lives=="Live in area",]

####check change in reported numbers over 2 different plans

persons_2040_diff <- sum(persons_change[persons_change$Lives=="Live in area" & persons_change$model_run=="2040_06_694_Amd1",c('persons')])
persons_2010_diff <- sum(persons_change[persons_change$Lives=="Live in area" & persons_change$model_run=="2010_06_YYY",c('persons')])

print(persons_2040_diff)
print(persons_2010_diff)

#employment
bgempPBA2017_2040<- sum(persons_change[persons_change$Works=="Works in area" & persons_change$model_run=="2040_06_694_Amd1",c('persons')])
bgempPBA2017_2010<- sum(persons_change[persons_change$Works=="Works in area" & persons_change$model_run=="2010_06_YYY",c('persons')])

print(bgempPBA2017_2040 - bgempPBA2017_2010)
