/*jslint vars: true, sloppy: true, nomen: true, plusplus: true */
/*global define, console */

define(['phi-core'], function (PHI) {
    
    
    var Binder = function (obj, property) {
        this.obj = obj;
        this.property = property;
        this.events = new PHI.EventDispatcher();
    };
    
    var BindService = function () {
        this.binders = {};
    };
    
    BindService.prototype = {
        
        createBinder: function (obj, property) {
            var binder = new Binder(obj, property);
            
            this.binders[obj.Id + "_" + property] = binder;
            return binder;
        },
        
        updateModel: function (dest, source) {

            var property, i, j, binder;
            
            for (property in source) {
                if (source.hasOwnProperty(property)) {
                    
                    if (PHI.isArray(source[property])) {
                        
                        for (i = 0; i < source[property].length; i++) {
                            var itemSource = source[property][i],
                                itemDest = this._getById(dest[property], itemSource.Id);
                            
                            if (itemDest !== null) {
                                this.updateModel(itemDest, itemSource);
                            }
                            // else {
                            //    dest[property].push(itemSource);
                            //}
                        }
                        
                    } else if (typeof source[property] === "object" && source[property] !== null) {
                        this.updateModel(dest[property], source[property]);
                    } else {
                        dest[property] = source[property];
                        
                        binder = this.binders[dest.Id + "_" + property];
                        
                        if (binder) {
                            binder.events.fire('bind');
                        }
                    }
                }
            }
            
            return dest;
        },
        
        _getById: function (arr, id) {
            
            var i = 0;
            
            for (i = 0; i < arr.length; i++) {
                if (arr[i].Id === id) {
                    return arr[i];
                }
            }
            
            return null;
        }
    };
    
    return BindService;
});



