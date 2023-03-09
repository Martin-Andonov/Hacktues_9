var isActive = false;

document.getElementById("button").addEventListener("click", function() {
  isActive = !isActive;
  console.log("Button clicked, isActive = " + isActive);
});


const LOCATION = "10.1.79.139:9999"



function sendLocation() {
    if(isActive) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            // serverSocket.send(`${position.coords.latitude} ${position.coords.longitude}`)
        });
    }
}


setInterval(sendLocation, 5000);

