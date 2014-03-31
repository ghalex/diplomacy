/*jslint vars: true, sloppy: true */
/*global window, jQuery */

var D = D || {};

D.jQuery = jQuery;

/*jslint vars: true, sloppy: true */
/*global $, window, angular, console */

/**
 * Diplomacy App
 * @author ghalex
 */

var app = angular.module('diplomacy', ['ui.keypress', 'ui.event'])
	.constant('useMockups', false)
	.constant('version', '@{version}')
	.constant('debug', false)
	.constant('unitOfTime', 1000)
    .constant("D", window.Diplomacy)
    .factory("serverUrl", function (debug) {
		return "http://localhost\\:8088";
	})
	.factory("hub", function () {
		
		var hub = $.connection.diplomacyHub;
		return hub;
	})
    .run(function ($rootScope, hub) {
        
        hub.client.update = function (msg) {
            console.log(msg);
        };
    });

/*jslint vars: true, sloppy: true, plusplus: true */
/*global D, google */


(function (exports) {

    var GeoJSON = function () {};
    
    GeoJSON.prototype = {
        error: function (message) {
        
            return {
                type: "Error",
                message: message
            };
        
        },
        
        ccw: function (path) {
            var isCCW;
            var a = 0, i;
            
            for (i = 0; i < path.length - 2; i++) {
                a += ((path[i + 1].lat() - path[i].lat()) * (path[i + 2].lng() - path[i].lng()) - (path[i + 2].lat() - path[i].lat()) * (path[i + 1].lng() - path[i].lng()));
            }
            
            if (a > 0) {
                isCCW = true;
            } else {
                isCCW = false;
            }
            
            return isCCW;
        },

        geometryToGoogleMaps: function (geojsonGeometry, opts, geojsonProperties) {
            var result = [];
            var i = 0,
                j = 0,
                k = 0,
                path,
                paths = [],
                coord,
                ll,
                exteriorDirection,
                interiorDirection,
                googleObj;
		
            switch (geojsonGeometry.Type) {
                
            case "Point":
                opts.position = new google.maps.LatLng(geojsonGeometry.Coordinates[1], geojsonGeometry.Coordinates[0]);
                googleObj = new google.maps.Marker(opts);
                
                if (geojsonProperties) {
                    googleObj.set("geojsonProperties", geojsonProperties);
                }
                
                result.push(googleObj);
                break;
                
            case "MultiPoint":
                googleObj = [];
                for (i = 0; i < geojsonGeometry.Coordinates.length; i++) {
                    opts.position = new google.maps.LatLng(geojsonGeometry.Coordinates[i][1], geojsonGeometry.Coordinates[i][0]);
                    googleObj.push(new google.maps.Marker(opts));
                }
                if (geojsonProperties) {
                    for (k = 0; k < googleObj.length; k++) {
                        googleObj[k].set("geojsonProperties", geojsonProperties);
                    }
                }
                    
                result = googleObj.concat();
                break;
                
            case "LineString":
                path = [];
                for (i = 0; i < geojsonGeometry.Coordinates.length; i++) {
                    coord = geojsonGeometry.Coordinates[i];
                    ll = new google.maps.LatLng(coord[1], coord[0]);
                    path.push(ll);
                }
                opts.path = path;
                googleObj = new google.maps.Polyline(opts);
                if (geojsonProperties) {
                    googleObj.set("geojsonProperties", geojsonProperties);
                }
                    
                result.push(googleObj);
                break;
                
            case "MultiLineString":
                googleObj = [];
                for (i = 0; i < geojsonGeometry.Coordinates.length; i++) {
                    path = [];
                    for (j = 0; j < geojsonGeometry.Coordinates[i].length; j++) {
                        coord = geojsonGeometry.Coordinates[i][j];
                        ll = new google.maps.LatLng(coord[1], coord[0]);
                        path.push(ll);
                    }
                    opts.path = path;
                    googleObj.push(new google.maps.Polyline(opts));
                }
                if (geojsonProperties) {
                    for (k = 0; k < googleObj.length; k++) {
                        googleObj[k].set("geojsonProperties", geojsonProperties);
                    }
                }
                
                result = googleObj.concat();
                break;
                
            case "Polygon":
                paths = [];

                for (i = 0; i < geojsonGeometry.Coordinates.length; i++) {
                    path = [];
                    for (j = 0; j < geojsonGeometry.Coordinates[i].length; j++) {
                        ll = new google.maps.LatLng(geojsonGeometry.Coordinates[i][j][1], geojsonGeometry.Coordinates[i][j][0]);
                        path.push(ll);
                    }
                    if (!i) {
                        exteriorDirection = this.ccw(path);
                        paths.push(path);
                    } else if (i === 1) {
                        interiorDirection = this.ccw(path);
                        if (exteriorDirection === interiorDirection) {
                            paths.push(path.reverse());
                        } else {
                            paths.push(path);
                        }
                    } else {
                        if (exteriorDirection === interiorDirection) {
                            paths.push(path.reverse());
                        } else {
                            paths.push(path);
                        }
                    }
                }
                opts.paths = paths;
                googleObj = new google.maps.Polygon(opts);
                if (geojsonProperties) {
                    googleObj.set("geojsonProperties", geojsonProperties);
                }
                    
                result.push(googleObj);
                break;
                
            case "MultiPolygon":
                googleObj = [];
                for (i = 0; i < geojsonGeometry.Coordinates.length; i++) {
                    paths = [];
                    
                    for (j = 0; j < geojsonGeometry.Coordinates[i].length; j++) {
                        path = [];
                        for (k = 0; k < geojsonGeometry.Coordinates[i][j].length; k++) {
                            ll = new google.maps.LatLng(geojsonGeometry.Coordinates[i][j][k][1], geojsonGeometry.Coordinates[i][j][k][0]);
                            path.push(ll);
                        }
                        if (!j) {
                            exteriorDirection = this.ccw(path);
                            paths.push(path);
                        } else if (j === 1) {
                            interiorDirection = this.ccw(path);
                            if (exteriorDirection === interiorDirection) {
                                paths.push(path.reverse());
                            } else {
                                paths.push(path);
                            }
                        } else {
                            if (exteriorDirection === interiorDirection) {
                                paths.push(path.reverse());
                            } else {
                                paths.push(path);
                            }
                        }
                    }
                    opts.paths = paths;
                    googleObj.push(new google.maps.Polygon(opts));
                }
                if (geojsonProperties) {
                    for (k = 0; k < googleObj.length; k++) {
                        googleObj[k].set("geojsonProperties", geojsonProperties);
                    }
                }
                
                result = googleObj.concat();
                break;
                
            default:
                result = this.error("Invalid GeoJSON object: Geometry object must be one of \"Point\", \"LineString\", \"Polygon\" or \"MultiPolygon\".");

            }
		
            return result;
        }
    };
    
    exports.GeoJSON = GeoJSON;
    
}(D));

/*jslint vars: true, sloppy: true, plusplus: true, evil: true */
/*global $, window, console, google */


(function (D) {

    var Loader = function (json) {
        this.events = new D.EventDispatcher();
        this.parser = new D.GeoJSON();
    };
    
    Loader.prototype = {
        
        loadCountry: function (jsonOrString) {
            
            if (typeof (jsonOrString) === "string") {
                return this.loadCountryFromFile(jsonOrString);
            }
            
            var countryJson = jsonOrString,
                country = new D.Country(),
                i = 0;
            
            country.Id = countryJson.id;
            country.Name = countryJson.name;
            
            for (i = 0; i < countryJson.Regions.length; i++) {
                
                var region = new D.Region();
                var regionJson = countryJson.Regions[i];
                
				// Fix 
				if (typeof (regionJson.Geometry.Coordinates) === "string") {
					regionJson.Geometry.Coordinates = eval(regionJson.Geometry.Coordinates);
				}
				
                region.Name = regionJson.name;
                region.addGeometries(this.parser.geometryToGoogleMaps(regionJson.Geometry, {clickable: true}));
                
                country.addRegion(region);
            }
            
            this.events.fire('country-loaded', country);
        }
    };
    
    D.Loader = Loader;
    
}(window.Diplomacy));


/*jslint vars: true, sloppy: true */
/*global D */


(function (exports, jQuery) {

    /**
	 * EventDispatcher class is used to catch and dispatch custom events.
	 * 
	 * @class EventDispatcher
	 * @module core
	 * @version 0.1.0
	 * @author Alexandru Ghiura
	 */
	var EventDispatcher = function (cfg) {
		this.events = {};
	};

	EventDispatcher.prototype = {

		/**
		 * Add listeners
		 * 
		 * @param eventName
		 * @param fn
		 * 
		 */
		on: function (eventName, fn, context) {
            
            var f = context ? jQuery.proxy(fn, context) : fn,
                events = this.events[eventName] = this.events[eventName] || [];
 
            fn.key = 'fn' + jQuery.now();
            fn.proxy = f;
            
            events[f.key] = f;
		},

		/**
		 * Fire an event
		 * 
		 * @param {String} eventName
		 * @param {Object} params
		 */
		fire: function (eventName, params) {
			var functions = this.events[eventName],
				key;
				
			for (key in functions) {
				
				if (typeof functions[key] === 'function') {
					var fn = functions[key];
					fn.apply(this, [params]);
				}
			}
		},

		/**
		 * Remove event
		 *
		 * @param {String} eventName
		 * @param {Function} fn
		 */
		detach: function (eventName, fn) {
			var events = this.events[eventName];

            if (events.hasOwnProperty(fn.key)) {
                delete events[fn.proxy || fn];
            }
            
			return;
		}
	};

	// Exports
	exports.EventDispatcher = EventDispatcher;
    
}(D, D.jQuery));


/*jslint vars: true, sloppy: true, plusplus: true */
/*global D */

(function (exports, jQuery, EventDispatcher) {

    var Country = function () {
        this.regions = [];
        this.events = new EventDispatcher();
    };
    
    Country.prototype = {
        
        addRegion: function (region) {
            this.regions.push(region);
            
            region.events.on('click', this.onRegionClick, this);
        },
        
        addToMap: function (map) {
            this.setMap(map);
        },
        
        removeFromMap: function () {
            this.setMap(null);
        },
        
        setMap: function (map) {

            jQuery.each(this.regions, function (index, region) {
                region.setMap(map);
            });
        },
        
        deselectAllRegions: function () {
            jQuery.each(this.regions, function (index, region) {
                region.deselect();
            });
        },
        
        onRegionClick: function (region) {
            
            this.deselectAllRegions();
            region.select();
			
            this.events.fire('region-click', region);
        }
    };
    
    exports.Country = Country;
    
}(D, D.jQuery, D.EventDispatcher));

/*jslint vars: true, sloppy: true, plusplus: true */
/*global D, google */

(function (exports, jQuery, EventDispatcher) {

    var Region = function (options) {
        this.geometries = [];
        this.events = new EventDispatcher();
        this.options = jQuery.extend({}, this.options, options);
    };
    
    Region.prototype = {
        
        options: {
            clickable: true,
            fillColor: "#8DD3C7",
            fillOpacity: 0.5,
            strokeColor: "#550000",
            strokeOpacity: 0.8,
            strokeWeight: 2
        },
        
        setMap: function (map) {

            jQuery.each(this.geometries, function (index, geometry) {
                geometry.setMap(map);
            });
        },
        
        addGeometries: function (geometries) {
            
            this.geometries = geometries.concat(this.geometries);
            
            jQuery.each(this.geometries, jQuery.proxy(function (index, geometry) {
                
                geometry.setOptions(this.options);
                google.maps.event.addListener(geometry, "click", jQuery.proxy(this.onGeometryClick, this));
                
            }, this));
        },
        
        select: function () {
            jQuery.each(this.geometries, function (index, geometry) {
                geometry.setOptions({fillColor: "#FF0000"});
            });
            
            this.isSelected = true;
        },
        
        deselect: function () {
            var color = this.options.fillColor;
            
            jQuery.each(this.geometries, function (index, geometry) {
                geometry.setOptions({fillColor: color});
            });
            
            this.isSelected = false;
        },
        
        onGeometryClick: function (evt) {
            this.events.fire('click', this);
        }
    };
    
    exports.Region = Region;
        
}(D, D.jQuery, D.EventDispatcher));

/*jslint vars: true, sloppy: true */
/*global $, angular, console, window */


/**
 * RegionTabCtrl. 
 * @author ghalex
 */
var RegionTabCtrl = function ($scope, $rootScope) {
	
    $scope.region = null;
	$scope.show = false;
    
    $rootScope.$on('region-click', function (evt, region) {
        $scope.$apply(function () {
            $scope.region = region;
			
			if ($scope.show !== (region !== null)) {
				$scope.show = (region !== null);
			}
        });
    });
};

/*jslint vars: true, sloppy: true */
/*global $, angular, console, window */


/**
 * CountryController. 
 * @author ghalex
 */
var EconomyCtrl = function ($scope, $rootScope) {
	
	$scope.country = {};
    $scope.region = null;
    
    // TODO: do this
    $rootScope.$on('region-click', function (evt, region) {
        $scope.$apply(function () {
            $scope.region = region;
        });
    });
};

/*jslint vars: true, sloppy: true */
/*global $, angular, console, window */

/**
 * GameLobbyController. 
 * @author ghalex
 */
var GameLobbyCtrl = function ($scope, hub, unitOfTime, $rootScope) {
	
    $scope.games = [];
    $scope.connected = false;
	$scope.joinedGame = "";
		       
	$scope.connect = function () {
        hub.connection.start();
    };
	
	$scope.disconnect = function () {
        hub.connection.stop();
    };
	
	$scope.newGame = function () {
        var gameID = hub.server.newGame();
    };
    
    $scope.joinGame = function (gameId) {
        hub.server.joinGame(gameId);
    };
    
	$scope.leaveGame = function (gameId) {
        hub.server.leaveGame(gameId);
		$scope.joinedGame = "";
    };
	
	$scope.runGame = function (gameId) {
        hub.server.runGame(gameId, 1);
    };
	
	$scope.stopGame = function (gameId) {
        hub.server.stopGame(gameId);
    };
	
	$scope.deleteGame = function (gameId) {
        hub.server.deleteGame(gameId);
    };
	
    hub.client.updateRegion = function (region) {
        $scope.$apply(function () {
        });
    };
	
	// Add HUB listeners
    hub.client.listGames = function (games) {
        $scope.$apply(function () {
			$scope.games = games;
        });
    };
	
	hub.client.joinGame = function (gameId, level) {
		$scope.$apply(function () {
			$scope.joinedGame = gameId;
			$rootScope.$broadcast('game-joined', {gameId: gameId, level: JSON.parse(level)});
        });
	};
	
	hub.connection.stateChanged(function (e) {
		
		if (e.newState === $.signalR.connectionState.connected) {
			$scope.connected = true;
			hub.server.listGames();
		} else {
			$scope.connected = false;
			$scope.games = [];
		}
	});
};

/*jslint vars: true, sloppy: true, plusplus: true */
/*global $, L, angular, console, window, document, google, GeoJSON */


/**
 * CountryController. 
 * @author ghalex
 */
var MapCtrl = function ($scope, $rootScope, D) {
	
	var mapKey = '37274fcb889148c3b64046e650f3d4b5',
		mapType = google.maps.MapTypeId.ROADMAP,
		mapCenter = new google.maps.LatLng(42, 2);
    
	function initMap() {
	
        $scope.map = new google.maps.Map(
            document.getElementById('map'),
            {
                center: new google.maps.LatLng(45, 5),
                zoom: 5,
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
                            gamma: 0.5
                        }]
                        
                    },
                    {
                        featureType: "administrative.locality",
                        elementType: "labels",
                        stylers: [
                            { visibility: "off" }
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
        
        // For test
        window.googleMap = $scope.map;
	}
	
    function loadLevel (level) {
        
        var loader = new D.Loader(),
			i = 0;
        
		
		for (i = 0; i < level.Countries.length; i++) {
			
			loader.events.on('country-loaded', function (country) {
            	
				country.addToMap($scope.map);
				country.events.on('region-click', function (region) {
					$rootScope.$broadcast('region-click', region);
				});
            
				google.maps.event.addListener($scope.map, "click", function () {
					$rootScope.$broadcast('region-click', null);
					country.deselectAllRegions();
				});
			});
        
        	// Load France
        	loader.loadCountry(level.Countries[i]);
		}
		
        
        
    }
	
	$rootScope.$on('game-joined', function (evt, data) {
		loadLevel(data.level);
	});
    
    
    // Init map & load data
	initMap();

};

