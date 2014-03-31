
/*jslint vars: true, sloppy: true */
/*global require, document, console */

require.config({
    baseUrl: '/web/app',
    paths: {
        'jquery': '../js/jquery-2.0.3',
        'jquery.tabs': '../js/jquery.tabs',
        'jquery.signalR': '../js/jquery.signalR-1.1.3',
        'jquery.connection': '../../signalr/hubs?noext',
        'angular': '../js/angular',
        'angular.ui.keypress': '../js/angular-keypress',
        'angular.ui.event': '../js/angular-event',
        'phi-core': '../js/phi-core'
    },
    shim: {
        'jquery': {exports: 'jquery'},
        'jquery.signalR': {deps: ['jquery']},
        'jquery.connection': {deps: ['jquery', 'jquery.signalR'], exports: 'jQuery.signalR'},
        'angular': {exports: 'angular'},
        'angular.ui.keypress': ['angular'],
        'angular.ui.event': ['angular']
    }
});

require([
    "jquery",
    "angular",
    "services/BindService",
    "jquery.tabs",
    "modules/app"],
    
    function ($, angular, BindService) {
    
        $(function () {
            
            // Start AngularJs
            angular.bootstrap(document, ['app']);
        });
    });

