/*jslint vars: true, sloppy: true */
/*global define */

/** PHI Core **/
define(function () {

    var PHI = {};
    
    PHI.bind = function (fn, c) {
        
        return function () {
            return fn.apply(c || fn, arguments);
        };

    };
    
    PHI.now = function () {
        return (new Date()).getTime();
    };
    
    PHI.isArray = function (val) {
        if (Object.prototype.toString.call(val) === '[object Array]') {
            return true;
        }
        
        return false;
    };
    
    /**
     * EventDispatcher class
     *
     * @version 0.1.0
     * @author Alexandru Ghiura
     */
    PHI.EventDispatcher = function () {
        this.events = {};
    };
    
    PHI.EventDispatcher.prototype = {
        
        /**
         * Add listeners
         *
         * @param eventName
         * @param fn
         *
         */
        on: function (eventName, fn, context) {
    
            var f = context ? PHI.bind(fn, context) : fn,
                events = this.events[eventName] = this.events[eventName] || [];
    
            fn.key = 'fn' + PHI.now();
            fn.proxy = f;
    
            events[f.key] = f;
        },
    
        /**
         * Fire an event
         *
         * @param {String} eventName
         * @param {Object} params
         */
        fire: function (eventName, params) {
            var functions = this.events[eventName],
                key;
    
            for (key in functions) {
    
                if (typeof functions[key] === 'function') {
                    var fn = functions[key];
                    fn.apply(this, [params]);
                }
            }
        },
    
        /**
         * Remove event
         *
         * @param {String} eventName
         * @param {Function} fn
         */
        detach: function (eventName, fn) {
            var events = this.events[eventName];
    
            if (events.hasOwnProperty(fn.key)) {
                delete events[fn.proxy || fn];
            }
    
            return;
        }
    };
    
    /**
     * Binder class
     *
     * @version 0.1.0
     * @author Alexandru Ghiura
     */
    PHI.Binder = function (model) {
        this.model = model;
    };
    
    
    PHI.Binder.prototype = {
        
        when: function (f) {
            
            f.call(this, this.model, this.then);
        },
        
        then: function (f) {
            f.call(this, this.model);
        }
        
    };
    
    return PHI;
});