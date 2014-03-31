/*jslint vars: true, sloppy: true */
/*global define, console */

define([
    'angular',
    'angular.ui.keypress',
    'angular.ui.event',
    'modules/controllers',
    'modules/services',
    'modules/models',
    'modules/factories',
    'modules/directives'],
       
    function (angular) {
    
        var app = angular.module('app', [
            'app.controllers',
            'app.services',
            'app.directives',
            'app.factories',
            'app.models',
            'ui.keypress',
            'ui.event' ])
        
            .constant('version', '@{version}')
            .constant('unitOfTime', 1000)
            .run(function ($rootScope) {
                
                console.log("Starting app...");
                console.log("App started...");
                
            });
        
        return app;
    
    });
