path <- "/Users/tommtc/Box/DataViz\ Projects/Data\ Analysis\ and\ Visualization/travel-model/"
df17_filename <- "vmt_results_2017.csv"

library(readr)
library(dplyr)

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

df17 <- df17[c('Population_Segment','persons','model_run','Entirely_Within','Partially_Within','Entirely_Outside','VMT_Per_Capita')]

burlingame_id <- 28
bg17 <- df17[df17['placeid']==burlingame_id,]
df17 <- arrange(df17,model_run,persons)

write_csv(bg_summary, file("Burlingame - PBA 2040 (2017) Non-commercial Passenger Vehicle Miles Traveled.csv"))

