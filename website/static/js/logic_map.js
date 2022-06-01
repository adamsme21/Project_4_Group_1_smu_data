$(document).ready(function() {
    doWork1();

    $('#filter2').on('change',function(){
        doWork1();
    });
});

function doWork1() {
    var url2 = "static/data/HateCrime_map2.csv";
    d3.csv(url2).then(function(data1) {
        console.log(data1);
        let yearfilter = $('#filter2').val();
        let data = data1.filter(function(d){ return d.Year ==yearfilter})
        // clear out the old map 
        $("#map-container").empty();
        $("#map-container").append('<div id="map" style="height:900px"></div>');//look at making this dynamic height
        createMap(data);
    });
}



// createMap() takes the earthquake data and incorporates it into the vis
function createMap(data) {

    // apply the filter (if necessary)
    var hatecrimes = data

    // My chosen Base Layers : https://docs.mapbox.com/api/maps/styles/
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });
    
    var satellite_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/satellite-v9',
        accessToken: API_KEY
    });

    var outdoors_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/outdoors-v11',
        accessToken: API_KEY
    });


    // create my circles
    var circles = [];
    for (let i = 0; i < hatecrimes.length; i++) {
        let hatecrime = hatecrimes[i];
        
        let radius_size = getRadius(hatecrime.Count);

        // the coordinates 
        let location = [hatecrime.Latitude, hatecrime.Longitude]

        let circle = L.circle(location, {
            color: "indigo",
            fillColor: "white",
            fillOpacity: 0.8,
            radius: radius_size, 
        }).bindPopup(`<h3>${hatecrime.State } Incident Count:${hatecrime.Count}</h3>`);
        circles.push(circle);
    }

    var circleLayer = L.layerGroup(circles);
    
    //let the radius of my circles depend on count of incidents. higher # =bigger circle
    function getRadius(incident) {
        return incident * 100
    }

    // Create a baseMaps object.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer,
        "Satellite": satellite_layer,
        "Outdoors": outdoors_layer
    };

    // Overlays that can be toggled on or off
    var overlayMaps = {
        // Pins: earthquakeLayer,
        Incidents: circleLayer,
    };

    
    // Create a new map.
    var myMap = L.map("map", {
        center: [
            31, -100
        ],
        zoom: 5,
        layers: [dark_layer,circleLayer] 
    });

    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    L.control.layers(baseMaps,overlayMaps ).addTo(myMap); 


}

