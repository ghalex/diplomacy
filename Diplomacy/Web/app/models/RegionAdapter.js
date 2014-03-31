/*jslint vars: true, sloppy: true, nomen: true */
/*global define */

define(['phi-core'], function (PHI) {
    
    var RegionAdapter = function (args) {
        
        this.model = args.model;
        this.map = args.map;
        this.geoJSONService = args.geoJSONService;
        
        this.init();
    };
    
    RegionAdapter.prototype = {
        
        init: function () {
            
            this.geometries = this.geoJSONService.geometryToGoogleMaps(this.model.Geometry,
                {
                    clickable: true,
                    fillColor: "#8DD3C7",
                    fillOpacity: 0.5,
                    strokeColor: "#550000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2
                });
            
            this.setMap(this.map);
            this.update();
        },
        
        update: function () {
            this.setOptions({
                fillColor: this.model.Geometry.Color
            });
        },
        
        setMap: function (map) {
            
            this.geometries.forEach(function (geometry) {
                geometry.setMap(map);
            });
        },
        
        setOptions: function (options) {
            this.geometries.forEach(function (geometry) {
                geometry.setOptions(options);
            });
        },
        
        dispose: function () {
            this.setMap(null);
            this.geometries = [];
        }
    };
    
    return RegionAdapter;
});