const LOCATION = "10.1.79.139:9999";
// const LOCATION = "192.168.0.7";
let ws;
var isConected = false; //* if there is an error it will be set to false
var isActive = false;

let messageHelp = "";

document.getElementById("help-btn").addEventListener("click", function() {
  isActive = !isActive;
  console.log("Button clicked, isActive = " + isActive);
});

function connect() {
  	ws = new WebSocket(`ws://${LOCATION}`);
	console.log("Trying to connect..");

  ws.addEventListener('error', (event) => {
	isConected = false;
	ws.close();
	console.log("Can't connect. Retrying...");
  });

  ws.onclose = (event) => {
	isConected = false;
	ws.close();
	console.log("Connection closed. Retrying...");
  };
  ws.addEventListener('open', (event) => {
	isConected = true;
	ws.close();
	console.log('Connected to server');
  });
  ws.addEventListener('message', (event) => {
	console.log('message from server: ', event.data);
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
}, 5000); // repeat every 5 seconds

window.onbeforeunload = function () {
	ws.close();
}

function sendLocation() {

	
	if (ws.readyState === WebSocket.OPEN) {
		messageHelp = document.getElementById("textbox").value;
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position.coords.latitude, position.coords.longitude);

			try{
				if (isActive) {
					ws.send(`1|${position.coords.latitude}|${position.coords.longitude}|${messageHelp}`);
				} else {
					ws.send(`0|${position.coords.latitude}|${position.coords.longitude}|${messageHelp}`);
				}
			} catch {
				isConected = false;
				ws.close();
				console.log("Cant send a request. trying to connect again.")
			}
		});
  }
}
setInterval(sendLocation, 5000);