'use strict';


angular.module('capvmtApp')
    .controller('ExplorerCtrl', function ($scope, mapdata) {
        var features = [];
        var obj;
        var gmap;
        var i, w, v;
        $scope.tazGeo = {};
        var bounds = new google.maps.LatLngBounds();
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
            wkt = new Wkt.Wkt();
            $scope.mappedFeature = [];
            
            mapdata.getVMTtaz(id).success(function(response){
                if (response.length > 0) {
                        //do something here if needed...
                        $scope.tazGeo = response;
                		//console.log($scope.tazGeo[0].WKT);
                		
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
         * Generates the WKT Feature layer for the map.
         * @return  {Object}    Some sort of geometry object
         */
        
        //Reads WKT and returns leaflet layer
        function returnWKTFeature(layer) {
            //console.log(layer);
            if (layer) {
                wkt = new Wkt.Wkt();
                try { // Catch any malformed WKT strings
                    wkt.read(layer);

                } catch (e1) {
                    try {
                        wkt.read(el.value.replace('\n', '').replace('\r', '').replace('\t', ''));

                    } catch (e2) {
                        if (e2.name === 'WKTError') {
                            alert('Wicket could not understand the WKT string you entered. Check that you have parentheses balanced, and try removing tabs and newline characters.');
                            return;
                        }
                    }
                }
                obj = wkt.toObject(gmap.defaults); // Make an object
                var bounds = new google.maps.LatLngBounds();

            if (Wkt.isArray(obj)) { // Distinguish multigeometries (Arrays) from objects
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && !Wkt.isArray(obj[i])) {
                        obj[i].setMap(gmap);
                        features.push(obj[i]);

                        if(wkt.type === 'point' || wkt.type === 'multipoint')
                        	bounds.extend(obj[i].getPosition());
                        else
                        	obj[i].getPath().forEach(function(element,index){bounds.extend(element)});
                    }
                }

                features = features.concat(obj);
            } else {
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
            }

        }


        
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