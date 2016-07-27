'use strict';

angular.module('capvmtApp')
    .controller('DataCtrl', function($scope, places, modelruns, vmt) {


        $scope.Jurisdiction = "";


        /**
         * Maps the current contents of the textarea.
         * @return  {Object}    Some sort of geometry object
         */
        $scope.getPlaces = function() {

            places.getPlaces().success(function(response) {
                $scope.Places = response;
                //console.log($scope.Places);                   


            }).error(function(error) {
                console.log(error);
            });
            //end of getPlaces
        };

        $scope.getScenarioYR = function() {

            modelruns.getModelRuns().success(function(response) {
                $scope.Years = response;
                //console.log($scope.Years);                   


            }).error(function(error) {
                console.log(error);
            });
            //end of getVMTtaz
        };

        $scope.setCity = function(id) {
            places.setPlaceValue([{
                id: id
            }]);
            console.log(places.getPlaceValue());
        };

        $scope.setModelRun = function(value) {
            modelruns.setModelRunValue([{
                mr: value
            }]);
            console.log(modelruns.getModelRunValue());
        };
        /**
         * Gets the VMT Data by Place ID and Scenario Year.
         * @return  {Object}    Some sort of geometry object
         */
        $scope.getData = function() {

            var id = places.getPlaceValue();
            var mr = modelruns.getModelRunValue();


            vmt.getVMTdata(id[0].id, mr[0].mr).success(function(response) {
                var data = response;
                $scope.totals = {};
                var totalPersons = 0;
                var totalOutside = 0;
                var totalInside = 0;
                var totalPartial = 0;
                var totalVMT = 0;
                var totalVMTPerCapita = 0;

                $scope.vmtData = response;

                //Build totals array
                for (var i = data.length - 1; i >= 0; i--) {
                    totalPersons += data[i].Persons;
                    totalInside = totalInside + data[i].Inside;
                    totalPartial = totalPartial + data[i].Partially_In;
                    totalOutside = totalOutside + data[i].Outside;
                    totalVMT = totalVMT + data[i].Total;
                }

                totalVMTPerCapita = totalVMT / totalPersons;
                $scope.totals = {
                    totalPersons: totalPersons,
                    totalInside: totalInside,
                    totalPartial: totalPartial,
                    totalOutside: totalOutside,
                    totalVMT: totalVMT,
                    totalVMTPerCapita: totalVMTPerCapita
                };

                //Build TAZ list
                $scope.TAZList = data[0].tazlist.replace(/,/g, ", ");
                $('#TAZs').html($scope.TAZList);

                //Update Table City, Scenario and TAZ List for Selected Values 
                // $('#CityName').html("<h4>Climate Action Plan VMT Data</h4><b>Place Name: </b>" + data[0].CityName);
                // $('#ModelRun').html("<b>Simulation ID: </b>" + data[0].Model_Run);


                //Lives
                // $('#Lives0').html(data[0].Lives + "/ <br />" + data[0].Works);
                // $('#Lives1').html(data[1].Lives + "/ <br />" + data[1].Works);
                // $('#Lives2').html(data[2].Lives + "/ <br />" + data[2].Works);
                // $('#Lives3').html(data[3].Lives + "/ <br />" + data[3].Works);
                // $('#Lives4').html(data[4].Lives + "/ <br />" + data[4].Works);
                // $('#Lives5').html(data[5].Lives + "/ <br />" + data[5].Works);

                // //Works
                // $('#Works0').text(data[0].Works);
                // $('#Works1').text(data[1].Works);
                // $('#Works2').text(data[2].Works);
                // $('#Works3').text(data[3].Works);
                // $('#Works4').text(data[4].Works);
                // $('#Works5').text(data[5].Works);

                // //Persons
                // $('#Persons0').text($scope.addCommas(data[0].Persons));
                // $('#Persons1').text($scope.addCommas(data[1].Persons));
                // $('#Persons2').text($scope.addCommas(data[2].Persons));
                // $('#Persons3').text($scope.addCommas(data[3].Persons));
                // $('#Persons4').text($scope.addCommas(data[4].Persons));
                // $('#Persons5').text($scope.addCommas(data[5].Persons));
                // $('#TotalPersons').text($scope.addCommas(data[0].Persons + data[1].Persons + data[2].Persons + data[3].Persons + data[4].Persons + data[5].Persons));

                // //Inside
                // $('#Inside0').text($scope.addCommas(data[0].Inside));
                // $('#Inside1').text($scope.addCommas(data[1].Inside));
                // $('#Inside2').text($scope.addCommas(data[2].Inside));
                // $('#Inside3').text($scope.addCommas(data[3].Inside));
                // $('#Inside4').text($scope.addCommas(data[4].Inside));
                // $('#Inside5').text($scope.addCommas(data[5].Inside));

                // //PCT
                // $('#Inside0pct').text((data[0].Inside / (data[0].Total) * 100).toFixed(1) + "%");
                // $('#Inside1pct').text((data[1].Inside / (data[1].Total) * 100).toFixed(1) + "%");
                // $('#Inside2pct').text((data[2].Inside / (data[2].Total) * 100).toFixed(1) + "%");
                // $('#Inside3pct').text((data[3].Inside / (data[3].Total) * 100).toFixed(1) + "%");
                // $('#Inside4pct').text((data[4].Inside / (data[4].Total) * 100).toFixed(1) + "%");
                // $('#Inside5pct').text((data[5].Inside / (data[5].Total) * 100).toFixed(1) + "%");
                // //Total
                // $('#TotalInside').text($scope.addCommas(data[0].Inside + data[1].Inside + data[2].Inside + data[3].Inside + data[4].Inside + data[5].Inside));

                // //Partially_In
                // $('#Partially_In0').text($scope.addCommas(data[0].Partially_In));
                // $('#Partially_In1').text($scope.addCommas(data[1].Partially_In));
                // $('#Partially_In2').text($scope.addCommas(data[2].Partially_In));
                // $('#Partially_In3').text($scope.addCommas(data[3].Partially_In));
                // $('#Partially_In4').text($scope.addCommas(data[4].Partially_In));
                // $('#Partially_In5').text($scope.addCommas(data[5].Partially_In));


                // //PCT
                // $('#Partially_In0pct').text((data[0].Partially_In / (data[0].Total) * 100).toFixed(1) + "%");
                // $('#Partially_In1pct').text((data[1].Partially_In / (data[1].Total) * 100).toFixed(1) + "%");
                // $('#Partially_In2pct').text((data[2].Partially_In / (data[2].Total) * 100).toFixed(1) + "%");
                // $('#Partially_In3pct').text((data[3].Partially_In / (data[3].Total) * 100).toFixed(1) + "%");
                // $('#Partially_In4pct').text((data[4].Partially_In / (data[4].Total) * 100).toFixed(1) + "%");
                // $('#Partially_In5pct').text((data[5].Partially_In / (data[5].Total) * 100).toFixed(1) + "%");
                // //Total
                // $('#TotalPartially_In').text($scope.addCommas(data[0].Partially_In + data[1].Partially_In + data[2].Partially_In + data[3].Partially_In + data[4].Partially_In + data[5].Partially_In));

                // //Outside
                // $('#Outside0').text($scope.addCommas(data[0].Outside));
                // $('#Outside1').text($scope.addCommas(data[1].Outside));
                // $('#Outside2').text($scope.addCommas(data[2].Outside));
                // $('#Outside3').text($scope.addCommas(data[3].Outside));
                // $('#Outside4').text($scope.addCommas(data[4].Outside));
                // $('#Outside5').text($scope.addCommas(data[5].Outside));
                // //PCT
                // $('#Outside0pct').html((data[0].Outside / (data[0].Total) * 100).toFixed(1) + "%");
                // $('#Outside1pct').html((data[1].Outside / (data[1].Total) * 100).toFixed(1) + "%");
                // $('#Outside2pct').html((data[2].Outside / (data[2].Total) * 100).toFixed(1) + "%");
                // $('#Outside3pct').html((data[3].Outside / (data[3].Total) * 100).toFixed(1) + "%");
                // $('#Outside4pct').html((data[4].Outside / (data[4].Total) * 100).toFixed(1) + "%");
                // $('#Outside5pct').html((data[5].Outside / (data[5].Total) * 100).toFixed(1) + "%");
                // //Total
                // $('#TotalOutside').html($scope.addCommas(data[0].Outside + data[1].Outside + data[2].Outside + data[3].Outside + data[4].Outside + data[5].Outside));

                // //Total
                // $('#Total0').text($scope.addCommas(data[0].Total));
                // $('#Total1').text($scope.addCommas(data[1].Total));
                // $('#Total2').text($scope.addCommas(data[2].Total));
                // $('#Total3').text($scope.addCommas(data[3].Total));
                // $('#Total4').text($scope.addCommas(data[4].Total));
                // $('#Total5').text($scope.addCommas(data[5].Total));

                // //Per Capita
                // $('#PerCapita0').html(((data[0].Total / data[0].Persons)).toFixed(2));
                // $('#PerCapita1').html(((data[1].Total / data[1].Persons)).toFixed(2));
                // $('#PerCapita2').html(((data[2].Total / data[2].Persons)).toFixed(2));
                // $('#PerCapita3').html(((data[3].Total / data[3].Persons)).toFixed(2));
                // $('#PerCapita4').html(((data[4].Total / data[4].Persons)).toFixed(2));
                // $('#PerCapita5').html(((data[5].Total / data[5].Persons)).toFixed(2));
                // $('#PerCapitaTotal').html((((data[0].Total + data[1].Total + data[2].Total + data[3].Total + data[4].Total + data[5].Total) / (data[0].Persons + data[1].Persons + data[2].Persons + data[3].Persons + data[4].Persons + data[5].Persons))).toFixed(2));

                // //Total
                // $('#TotalVMT').text($scope.addCommas(data[0].Total + data[1].Total + data[2].Total + data[3].Total + data[4].Total + data[5].Total));
            });

        };



        // $scope.addCommas = function(nStr) {
        //     nStr += '';
        //     var x = nStr.split('.');
        //     var x1 = x[0];
        //     var x2 = x.length > 1 ? '.' + x[1] : '';
        //     var rgx = /(\d+)(\d{3})/;
        //     while (rgx.test(x1)) {
        //         x1 = x1.replace(rgx, '$1' + ',' + '$2');
        //     }
        //     return x1 + x2;
        // };

        $scope.getPlaces();
        $scope.getScenarioYR();
        $scope.getData();

    });
