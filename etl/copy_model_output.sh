## This is a stub for the movement
## it should be read and edited before execution based on the purpose

declare -a arr_in=("2005_05_003" "2010_06_003" "2015_06_002" "2020_06_694" "2030_06_694_Amd1" "2035_06_694_Amd1" "2040_06_694_Amd1") 
declare -a arr_out_vmt=("vmt_2005_05_YYY" "vmt_2010_06_YYY" "vmt_2015_06_YYY" "vmt_2020_06_694" "vmt_2030_06_694_Amd1" "vmt_2035_06_694_Amd1" "vmt_2040_06_694_Amd1")
declare -a arr_out_persons=("persons_2005_05_YYY" "persons_2010_06_YYY" "persons_2015_06_YYY" "persons_2020_06_694" "persons_2030_06_694_Amd1" "persons_2035_06_694_Amd1" "persons_2040_06_694_Amd1")

M_PATH="/M/Application/Model One/RTP2017/Scenarios"
SUMMARY_PATH="OUTPUT/core_summaries"
BOX_PATH="/C/Users/tbuckley/Box/DataViz Projects/Data Analysis and Visualization/Vehicle Miles Traveled Data Portal - 2018 Update"
PERSONS_FILE="AutoTripsVMT_personsHomeWork.csv"
VMT_FILE="AutoTripsVMT_perOrigDestHomeWork.csv"

## now loop through the above array
#for index in ${!arr_in[*]}; do 
#  cp "$M_PATH/${arr_in[$index]}/$SUMMARY_PATH/$PERSONS_FILE" "$BOX_PATH/${arr_out_persons[$index]}.csv"
#  cp "$M_PATH/${arr_in[$index]}/$SUMMARY_PATH/$VMT_FILE" "$BOX_PATH/${arr_out_vmt[$index]}.csv"
#done

# for i in "${arr[@]}"
# do
#    cp "$M_PATH/$i/$SUMMARY_PATH/$PERSONS_FILE" "$BOX_PATH/$i$PERSONS_FILE"
#    cp "$M_PATH/$i/$SUMMARY_PATH/$VMT_FILE" "$BOX_PATH/$i$VMT_FILE"
# done
