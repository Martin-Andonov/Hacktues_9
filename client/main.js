var isActive = false;

document.getElementById("button").addEventListener("click", function() {
  isActive = !isActive;
  console.log("Button clicked, isActive = " + isActive);
});

const LOCATION = "10.1.79.139:9999";
const ws = new WebSocket(`ws://${LOCATION}`);

ws.addEventListener('open', (event) => {
  console.log('Connected to server');
});

ws.addEventListener('message', (event) => {
  console.log('Message from server: ', event.data);
}); 

function sendLocation() {
  if(isActive) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      ws.send(`${position.coords.latitude}|${position.coords.longitude}`);
    });
  }
}

setInterval(sendLocation, 5000);