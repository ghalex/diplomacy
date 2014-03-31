/*jslint vars: true, sloppy: true */
/*global define, console */

define(function (require) {
    
    var angular = require('angular');
    
    return angular.module('app.controllers', [])
            .controller('MainCtrl', require('controllers/MainCtrl'))
            .controller('GameLobbyCtrl', require('controllers/GameLobbyCtrl'))
            .controller('RegionCtrl', require('controllers/RegionCtrl'))
            .controller('MapCtrl', require('controllers/MapCtrl'));
    
});
