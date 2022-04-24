
// Creating the map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Assemble the API query URL.
  var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Get the data with d3.
  d3.json(queryUrl).then(function(data) {
      console.log(data)

  L.geoJson(data,{
      pointToLayer: function(feature,latLong) {
          return L.circleMarker(latLong)
      },
      onEachFeature: function(feature,layer) {
          layer.bindPopup("magnitude " + feature.properties.mag
                        + "<br> depth" + feature.geometry.coordinates[2]);
      }
  }).addTo(myMap)

  });
  