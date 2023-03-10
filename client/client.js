// const LOCATION = "10.1.79.77:9999";
const LOCATION = "192.168.0.7";
let ws;
var isConected = false; //* if there is an error it will be set to false
var isActive = false;

document.getElementById("button").addEventListener("click", function() {
  isActive = !isActive;
  console.log("Button clicked, isActive = " + isActive);
});

function connect() {
  ws = new WebSocket(`ws://${LOCATION}`);
    console.log("Trying to connect..");

  ws.onerror = (event) => {
    isConected = false;
    console.log("Can't connect. Retrying...");
  };
  ws.onclose = (event) => {
    isConected = false;
    console.log("Connection closed. Retrying...");
  };
  ws.addEventListener('open', (event) => {
    isConected = true;
    console.log('Connected to server');
  });
  ws.addEventListener('message', (event) => {
    console.log('Message from server: ', event.data);
  }); 
  window.onbeforeunload = function () {
    isConected = false;
    ws.close();
  };
}

connect();

const intervalId = setInterval(() => {
  if (!isConected) {
    connect(); // call the connect function again
  }
}, 1000); // repeat every second

function sendLocation() {
  if (isActive && ws.readyState === WebSocket.OPEN) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      ws.send(`${position.coords.latitude}|${position.coords.longitude}`);
    });
  }
}

setInterval(sendLocation, 5000);