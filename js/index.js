$(document).ready(function() {

    /**
     * [Sample function that passes in TRSID and SelCycle on button click]
     * @return {[type]} [JSON array of assets]
     */
    var ReportTitle = 'Correspondence Table';

    /**
     * Download Place TAZ data
     * On button click, request data, convert to CSV and download
     */
    $("#placeTazBtn").click(function() {
        //Show loading indicator
        $('#loading-indicator').show();
        var url = 'http://capvmt.us-west-2.elasticbeanstalk.com/api/places/placeTAZ';
        //Send request to server and handle response in success function
        $.ajax({
            type: "GET",
            url: url,
            success: function(response) {
                $('#loading-indicator').hide();
                JSONToCSVConvertor(response, ReportTitle, true);
            },
            dataType: 'json'
        });
    });

     /**
     * Download Place TAZ 1454 data
     * On button click, request data, convert to CSV and download
     */
    $("#placeTaz1454Btn").click(function() {
        //Show loading indicator
        $('#loading-indicator').show();
        var url = 'http://capvmt.us-west-2.elasticbeanstalk.com/api/places/placeTAZ1454';
        //Send request to server and handle response in success function
        $.ajax({
            type: "GET",
            url: url,
            success: function(response) {
                $('#loading-indicator').hide();
                JSONToCSVConvertor(response, ReportTitle, true);
            },
            dataType: 'json'
        });
    });

     /**
     * Download VMT data
     * On button click, request data, convert to CSV and download
     */
    $("#vmtBtn").click(function() {
        console.log('clicked');
        //Show loading indicator
        $('#loading-indicator').show();
        var url = 'http://capvmt.us-west-2.elasticbeanstalk.com/api/vmt';
        //Send request to server and handle response in success function
        $.ajax({
            type: "GET",
            url: url,
            success: function(response) {
                $('#loading-indicator').hide();
                JSONToCSVConvertor(response, ReportTitle, true);
            },
            dataType: 'json'
        });
    });

    //Convert JSON data to CSV
    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "CAPVMT_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        //Add function here to deal with converting JSON array to CSV? 
    }

});
