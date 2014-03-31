/*jslint vars: true, sloppy: true */
/*global define, google */

define([], function () {
    
    var ArmyAdapter = function (args) {
        
        this.map = args.map;
        this.model = args.model;
        this.parentModel = args.parentModel;
        this.markerImage = "images/army-marker.png";
            
        this.init();
    };
    
    ArmyAdapter.prototype = {
        
        init: function () {
            
            var pos = this.parentModel.Geometry.Center;
            
            this.marker = new google.maps.Marker({
                icon: this.markerImage,
                map: this.map,
                position: new google.maps.LatLng(pos.Lat, pos.Lng)
            });
        },
        
        dispose: function () {
            this.marker.setMap(null);
        }
        
    };
    
    return ArmyAdapter;
});