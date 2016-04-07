'use strict';


angular.module('capvmtApp')
    .controller('ExplorerCtrl', function ($scope, mapdata, places) {
        var features = [];
        var obj;
        var gmap;
        var wkt;
        var i, w, v;
        $scope.selectedCity = places.getPlaceValue();
        $scope.tazGeo = {};
        var bounds = new google.maps.LatLngBounds();

        $scope.Jurisdiction = "";
        /**
         * Clears the map contents.
         */
        $scope.clearMap = function () {
            var i;
            for (i in features) {
                if (features.hasOwnProperty(i)) {
                    features[i].setMap(null);
                }
            }
            features.length = 0;
        };
        
        /**
         * Maps the current contents of the textarea.
         * @return  {Object}    Some sort of geometry object
         */
        $scope.mapIt = function (ft) {
            $scope.clearMap();
            wkt = new Wkt.Wkt();
            //$scope.mappedFeature = [];
            
            var placeID = $scope.selectedCity[0].id;
            switch(ft){
            	case 'taz':
            	mapdata.getVMTtaz(placeID).success(function(response){
                if (response.length > 0) {
                        //do something here if needed...
                        $scope.tazGeo = response;
                		//console.log($scope.tazGeo[0].WKT);
                		$scope.Jurisdiction = $scope.tazGeo[0].CityName;                		
                    }
                    for (var i = $scope.tazGeo.length - 1; i >= 0; i--) {
                        if ($scope.tazGeo[i].WKT) {
                              //$scope.mappedFeature.push($scope.tazGeo[0].WKT); 
                              $scope.addToMap($scope.tazGeo[i].WKT);                             
                                               
                            }                            
                        } 
                
                
            }).error(function(error){
                console.log(error);
            });
            //end of getVMTtaz
            break;
            case 'utaz':
            mapdata.getVMTurbantaz(placeID).success(function(response){
                if (response.length > 0) {
                        //do something here if needed...
                        $scope.tazGeo = response;
                		//console.log($scope.tazGeo[0].WKT); 
                		$scope.Jurisdiction = $scope.tazGeo[0].CityName;                		
                    }
                    for (var i = $scope.tazGeo.length - 1; i >= 0; i--) {
                        if ($scope.tazGeo[i].WKT) {
                              //$scope.mappedFeature.push($scope.tazGeo[0].WKT); 
                              $scope.addToMap($scope.tazGeo[i].WKT);                             
                                               
                            }                            
                        } 
                
                
            }).error(function(error){
                console.log(error);
            });
            //end of getVMTutaz
            break;
            case 'place':
            mapdata.getVMTplace(placeID).success(function(response){
                if (response.length > 0) {
                        //do something here if needed...
                        $scope.tazGeo = response;
                		//console.log($scope.tazGeo[0].WKT);
                		$scope.Jurisdiction = $scope.tazGeo[0].CityName;                 		
                    }
                    for (var i = $scope.tazGeo.length - 1; i >= 0; i--) {
                        if ($scope.tazGeo[i].WKT) {
                              //$scope.mappedFeature.push($scope.tazGeo[0].WKT); 
                              $scope.addToMap($scope.tazGeo[i].WKT);                             
                                               
                            }                            
                        } 
                
                
            }).error(function(error){
                console.log(error);
            });
            //end of getVMTplace
            break;
            }

            
            
            
                   
            
        };

        $scope.addToMap = function(layer){
				//console.log(layer);
                
                try{
					wkt.read(layer);
                } catch (e1){
                    try {
                        wkt.read(el.value.replace('\n', '').replace('\r', '').replace('\t', ''));
						console.log(el);
                    } catch (e2) {
                        if (e2.name === 'WKTError') {
                            alert('Wicket could not understand the WKT string you entered. Check that you have parentheses balanced, and try removing tabs and newline characters.');
                            return;
                        }
                    }
                }
                
                obj = wkt.toObject(gmap.defaults); // Make an object
                
                if (Wkt.isArray(obj)) { // Distinguish multigeometries (Arrays) from objects
                console.log("This object is an array...");
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && !Wkt.isArray(obj[i])) {
                        //obj[i].setEditable(false);
                        obj[i].setMap(gmap);
                        features.push(obj[i]);
						//get the extent of the features
                        if(wkt.type === 'point' || wkt.type === 'multipoint')
                        	bounds.extend(obj[i].getPosition());
                        else
                        	console.log("This is a multi-part polygon...")
                        	obj[i].getPath().forEach(function(element,index){bounds.extend(element)});
                    }
                }
                
                features = features.concat(obj);
                features.push(obj);
                

            } else {
            	
            	//obj.setEditable(false);
                obj.setMap(gmap); // Add it to the map
				
                features.push(obj);

                if(wkt.type === 'point' || wkt.type === 'multipoint')
                	bounds.extend(obj.getPosition());
                else
                	obj.getPath().forEach(function(element,index){bounds.extend(element)});
                
            }
			
             // Pan the map to the feature
            gmap.fitBounds(bounds);

                return obj;
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
                    editable: false,
                    strokeColor: '#999999',
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
                    $scope.mapIt('taz');
                    // if($scope.selectedCity[0].id.length > 0){
                    // 	$scope.mapIt($scope.selectedCity[0].id,'taz');
                    // }
                    //$scope.mapIt(22,'utaz');
                }
            });

            return gmap;
        }

        $scope.initMap();
    });