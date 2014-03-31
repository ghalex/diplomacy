/*jslint vars: true, sloppy: true */
/*global define, console */

define(function (require) {
    
    var angular = require('angular'),
        HubService = require('services/HubService'),
        GeoJSONService = require('services/GeoJSONService'),
        BindService = require('services/BindService');
    
    return angular.module('app.services', [])
        .factory('hubService', function () { return new HubService(); })
        .factory('geoJSONService', function () { return new GeoJSONService(); })
        .factory('bindService', function () { return new BindService(); });
    
});
