/*jslint vars: true, sloppy: true, plusplus: true */
/*global define, google, console */

define(['phi-core'], function (PHI) {
    
    /**
     * Init GoogleMap
     * @param container
     */
    function initMap(container) {
        
        var mapKey = '37274fcb889148c3b64046e650f3d4b5',
            mapType = google.maps.MapTypeId.ROADMAP,
            mapCenter = new google.maps.LatLng(42, 2);
	
        var map = new google.maps.Map(
            container,
            {
                center: new google.maps.LatLng(45, 5),
                zoom: 6,
                mapTypeControl: false,
                panControl: false,
                zoomControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                minZoom: 5,
                maxZoom: 10,
                styles: [
                    {
                        featureType: "administrative.country",
                        elementType: "geometry.stroke",
                        stylers: [
                            { weight: 2 },
                            { color: "#570000" }
                        ]
                    },
                    {
                        featureType: "all",
                        elementType: "geometry.fill",
                        stylers: [{
                            hue: "#EABD8F"
                        }, {
                            saturation: 50
                        }, {
                            lightness: 0
                        }, {
                            gamma: 10.0
                        }]
                        
                    },
                    {
                        featureType: "administrative.locality",
                        elementType: "labels",
                        stylers: [
                            { visibility: "on" }
                        ]
                    },
                    {
                        featureType: "water",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#F2E0C6"
                        }]
                        
                    },
                    {
                        featureType: "road",
                        elementType: "all",
                        stylers: [
                            { visibility: "off" }
                        ]
                    }
                ]
            }
        );
        
        return map;
	}
    
    return function ($scope, $document, geoJSONService, modelProvider, bindService) {
        
        $scope.map = initMap($document[0].getElementById('map'));
                
        $scope.$watch('joinedGame', function (newVal, oldVal) {
            
            var level = null;
            
            if (newVal === null) {
                level = oldVal.Level;
                
                level.Countries.forEach(function (country) {
                    country.Regions.forEach(function (region) {
                        region.adapter.dispose();
                        region.Armies.forEach(function (army) {
                            army.adapter.dispose();
                        });
                    });
                });
            }
        
            // If we joined a new game
            if (newVal) {

                level = newVal.Level;
                
                level.Countries.forEach(function (country) {
                    country.Regions.forEach(function (region) {
                        
                        // Create Region adapter.
                        region.adapter = modelProvider.create(
                            'RegionAdapter',
                            {
                                'map': $scope.map,
                                'model': region,
                                'parentModel': country,
                                'geoJSONService': geoJSONService
                            }
                        );
                        
                        bindService.createBinder(region.Geometry, "Color").events.on('bind', function () {
                            region.adapter.update();
                        });
                        
                        region.Armies.forEach(function (army) {
                            
                            // Create Army adapter
                            army.adapter = modelProvider.create(
                                'ArmyAdapter',
                                {
                                    'map': $scope.map,
                                    'model': army,
                                    'parentModel': region
                                }
                            );
                        });
                        
                    });
                });
            }

        });
    };
});