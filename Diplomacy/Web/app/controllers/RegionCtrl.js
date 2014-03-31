/*jslint vars: true, sloppy: true */
/*global define */


define(['jquery'], function ($) {
   
    return function ($scope, $rootScope) {
	
        $scope.region = {
            name: "Timisoara",
            population: 150
        };
        
        $scope.isShowing = false;
        
        $rootScope.$on('region-click', function (evt, region) {
            $scope.$apply(function () {
                $scope.region = region;
                
                if ($scope.isShowing !== (region !== null)) {
                    $scope.isShowing = (region !== null);
                }
            });
        });
    };
    
});