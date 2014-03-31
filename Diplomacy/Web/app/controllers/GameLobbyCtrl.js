/*jslint vars: true, sloppy: true */
/*global define, console */

define(['jquery'], function ($) {
    
    return function ($scope) {
        
        $scope.games = [];
        
        $scope.hub.client().updateGames = function (games) {
            $scope.$apply(function () {
                $scope.games = games;
            });
        };
        
        $scope.hub.events.on('disconnected', function () {
            $scope.games = [];
        });
    };
});