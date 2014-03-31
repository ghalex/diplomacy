/*jslint vars: true, sloppy: true, nomen: true, plusplus: true */
/*global define, google */


define([], function () {

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
                geometryCoord,
                ll,
                exteriorDirection,
                interiorDirection,
                googleObj;
		
            geometryCoord = JSON.parse(geojsonGeometry.Coordinates);
            
            switch (geojsonGeometry.Type) {
                
            case "Point":
                opts.position = new google.maps.LatLng(geometryCoord[1], geometryCoord[0]);
                googleObj = new google.maps.Marker(opts);
                
                if (geojsonProperties) {
                    googleObj.set("geojsonProperties", geojsonProperties);
                }
                
                result.push(googleObj);
                break;
                
            case "MultiPoint":
                googleObj = [];
                for (i = 0; i < geometryCoord.length; i++) {
                    opts.position = new google.maps.LatLng(geometryCoord[i][1], geometryCoord[i][0]);
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
                for (i = 0; i < geometryCoord.length; i++) {
                    coord = geometryCoord[i];
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
                for (i = 0; i < geometryCoord.length; i++) {
                    path = [];
                    for (j = 0; j < geometryCoord[i].length; j++) {
                        coord = geometryCoord[i][j];
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

                for (i = 0; i < geometryCoord.length; i++) {
                    path = [];
                    for (j = 0; j < geometryCoord[i].length; j++) {
                        ll = new google.maps.LatLng(geometryCoord[i][j][1], geometryCoord[i][j][0]);
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
                for (i = 0; i < geometryCoord.length; i++) {
                    paths = [];
                    
                    for (j = 0; j < geometryCoord[i].length; j++) {
                        path = [];
                        for (k = 0; k < geometryCoord[i][j].length; k++) {
                            ll = new google.maps.LatLng(geometryCoord[i][j][k][1], geometryCoord[i][j][k][0]);
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
    
    return GeoJSON;
    
});
