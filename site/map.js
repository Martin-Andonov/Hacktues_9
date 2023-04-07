

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

function data_brakedown(cords_data)
{ 
  console.log(cords_data);
  for(let i = 0; i < cords_data.length; i++)
  {
    //console.log("x:" + cords_data[i].lat + " y:" + cords_data[i].long);
    
    addMarker(cords_data[i][0],cords_data[i][1],cords_data[i][2]);
  }
}

let socket = new WebSocket("ws://127.0.0.1:9998");
let cords_data ;

socket.addEventListener('message', (event) => {
  //console.log('message from server: ', event.data);
  cords_data = JSON.parse(event.data);
  data_brakedown(cords_data);
}); 



function addMarkersToMap() {
  markers.forEach(function(marker) {
    marker.addTo(map);
  });
}
let markers = [];
let circles = [];
addMarker(42.71838645267613, 23.252889957671773, "Help!");
addMarkersToMap();

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