/*jslint vars: true, sloppy: true */
/*global define, console */

define(function (require) {
    
    var angular = require('angular');
    
    return angular.module('app.models', [])
        .factory('modelProvider', function () {
            
            var models = {
                'RegionAdapter': require('models/RegionAdapter'),
                'ArmyAdapter': require('models/ArmyAdapter')
            };
            
            return {
                create: function (modelId, options) {
                    
                    if (models[modelId]) {
                        return new models[modelId](options);
                    }
                }
            };
        });
    
});
