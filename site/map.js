var map = L.map('map').setView([42.69, 23.32], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addMarker(lat, lng, popupContent) {
  var marker = L.marker([lat, lng]).addTo(map);
  if (popupContent) {
    marker.bindPopup(popupContent);
  }
  markers.push(marker);
}

function addMarkersToMap() {
  markers.forEach(function(marker) {
    marker.addTo(map);
  });
}
let markers = [];
let circles = [];
addMarker(42.71838645267613, 23.252889957671773, "lulin");
addMarker(42.69720439595591, 23.308872700000002);
addMarkersToMap();
L.circle([42.42528, 25.63472], {
  radius: 30000,
  fillOpacity: 0.15
}).addTo(map);
//42.4252825.63472
function createCircle(coordinates, radius) {
  var circle = L.circle(coordinates, {
    radius: radius,
    fillOpacity: 0.15
  });
  circles.push(circle);
}
/*
Trqbva da go opravim posle deeba shibaniq javacript deeba maika mu deeba
function addCirclesToMap() {
  circles.forEach(function(circle) {
    circle.addTo(map);
  });
 */