'use strict';


angular.module('capvmtApp')
    .controller('ExplorerCtrl', function ($scope, mapdata) {
        var features = [];
        var obj = [];
        var gmap;
        var i, w, v;
        /**
         * Clears the map contents.
         */
        $scope.clearMap = function () {
            var i;

            // Reset the remembered last string (so that we can clear the map,
            //  paste the same string, and see it again)
            //document.getElementById('wkt').last = '';

            for (i in features) {
                if (features.hasOwnProperty(i)) {
                    features[i].setMap(null);
                }
            }
            features.length = 0;
        };
        /**
         * Clears the current contents of the textarea.
         */
        //        $scope.clearText = function () {
        //            document.getElementById('wkt').value = '';
        //        };
        /**
         * Maps the current contents of the textarea.
         * @return  {Object}    Some sort of geometry object
         */
        $scope.mapIt = function (id) {
            id=1;
            mapdata.getVMTtaz(id).success(function(response){
                if (response.length > 0) {
                        //do something here if needed...
                    }
                $scope.tazGeo = {};
                $scope.tazGeo = response;
                console.log($scope.tazGeo[0].WKT);
                
            }).error(function(error){
                console.log(error);
            });
            
                    for (var i = response.length - 1; i >= 0; i--) {
                        if (response[i].WKT) {
                            
                            $scope.COCs.addLayer(returnWKTFeature(response[i].WKT));
                            
                            });
                            
                        } else {                           

                            
                        }
                    }
            
        };
        
        /**
         * Application entry point.
         * @return  {<google.maps.Map>} The Google Maps API instance
         */
        $scope.initMap = function () {
            //gmap;

            gmap = new google.maps.Map(document.getElementById('canvas'), {
                center: new google.maps.LatLng(37.796966, -122.275051),
                defaults: {
                    icon: 'red_dot.png',
                    shadow: 'dot_shadow.png',
                    editable: true,
                    strokeColor: '#990000',
                    fillColor: '#EEFFCC',
                    fillOpacity: 0.6
                },
                disableDefaultUI: true,
                mapTypeControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT,
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                },
                panControl: true,
                streetViewControl: true,
                zoom: 10,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP,
                    style: google.maps.ZoomControlStyle.SMALL
                }
            });

            google.maps.event.addListener(gmap, 'tilesloaded', function () {
                if (!gmap.loaded) {
                    gmap.loaded = true;
                    //Load WKT Features to map
                    // NOTE: We start with a MULTIPOLYGON; these aren't easily deconstructed, so we won't set this object to be editable in this example
                    //document.getElementById('wkt').value = 'MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 45 20, 30 5, 10 10, 10 30, 20 35), (30 20, 20 25, 20 15, 30 20)))';
                    $scope.mapIt();
                }
            });

            return gmap;
        }

        $scope.initMap();
    });