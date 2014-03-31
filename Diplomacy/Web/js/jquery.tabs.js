/*jslint vars: true, sloppy: true */
/*global define */

/** Tab plugin **/
define(['jquery'], function ($) {
    
    $.fn.tab = function (options) {
      
        return this.each(function () {
            
            var btns = $(this).children('.tab-btns'),
                data = $(this).data('jquery.tabs'),
                content = $(this).children('.tab-content');
            
            if (!data) {
                
                $(this).data('jquery.tabs', true);
                
                btns.delegate("> div", "click", function (evt) {
                    btns.children().removeClass("selected");
                    content.children().removeClass("selected");
                    
                    var index = btns.children().index(evt.currentTarget);
                    $(evt.currentTarget).addClass("selected");
                    
                    $(content.children()[index]).addClass("selected");
                });
            }
        });
    };
    
    return $.fn.tab;
});