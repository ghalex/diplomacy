/*jslint vars: true, sloppy: true, plusplus: true, evil: true */
/*global $, window, console, google */


(function (D) {

    var Loader = function (json) {
        this.events = new D.EventDispatcher();
        this.parser = new D.GeoJSON();
    };
    
    Loader.prototype = {
        
        loadCountry: function (jsonOrString) {
            
            if (typeof (jsonOrString) === "string") {
                return this.loadCountryFromFile(jsonOrString);
            }
            
            var countryJson = jsonOrString,
                country = new D.Country(),
                i = 0;
            
            country.Id = countryJson.id;
            country.Name = countryJson.name;
            
            for (i = 0; i < countryJson.Regions.length; i++) {
                
                var region = new D.Region();
                var regionJson = countryJson.Regions[i];
                
				// Fix 
				if (typeof (regionJson.Geometry.Coordinates) === "string") {
					regionJson.Geometry.Coordinates = eval(regionJson.Geometry.Coordinates);
				}
				
                region.Name = regionJson.name;
                region.addGeometries(this.parser.geometryToGoogleMaps(regionJson.Geometry, {clickable: true}));
                
                country.addRegion(region);
            }
            
            this.events.fire('country-loaded', country);
        }
    };
    
    D.Loader = Loader;
    
}(window.Diplomacy));

