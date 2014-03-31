/*jslint vars: true, sloppy: true */
/*global define, console */

define(['jquery'], function ($) {
    
    return function ($scope, hubService, bindService) {
        
        $scope.joinedGame = undefined;
        $scope.hub = hubService;
        
        $scope.initComponents = function () {
            
            // jQuery TAB cp
            $(".cp-tab").tab();
        };
        
        $scope.hub.client().joinGame = function (game) {
            $scope.$apply(function () {
                $scope.joinedGame = game;
            });
        };
        
        $scope.hub.client().leaveGame = function () {
            $scope.$apply(function () {
                $scope.joinedGame = null;
            });
        };
        
        $scope.hub.client().updateGame = function (game) {
            $scope.$apply(function () {
                bindService.updateModel($scope.joinedGame, game);
            });
        };
    };
});