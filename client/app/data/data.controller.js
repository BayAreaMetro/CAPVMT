'use strict';

angular.module('capvmtApp')
    .controller('DataCtrl', function ($scope, places, modelruns) {
        

        $scope.Jurisdiction = "";
        
        
        /**
         * Maps the current contents of the textarea.
         * @return  {Object}    Some sort of geometry object
         */
        $scope.getPlaces = function () {
            
            	places.getPlaces().success(function(response){
                $scope.Places = response;
                //console.log($scope.Places);                   
                
                
            }).error(function(error){
                console.log(error);
            });
            //end of getPlaces
            };

            $scope.getScenarioYR = function () {
            
            	modelruns.getModelRuns().success(function(response){
                $scope.Years = response;
                //console.log($scope.Years);                   
                
                
            }).error(function(error){
                console.log(error);
            });
            //end of getVMTtaz
            };

            $scope.setCity = function(id){
            	places.setPlaceValue([{
                    id: id
                }]);
                console.log(places.getPlaceValue());
            }

            $scope.getPlaces();
            $scope.getScenarioYR();

    });
