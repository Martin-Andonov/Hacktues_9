// document.getElementById('help-btn').addEventListener('click', () => {
//
// })
function toggle() {
    document.getElementById('popup').style.opacity = '1';
    document.getElementById('popup').style.display = 'block';
    let blur = document.getElementById('blur');
    blur.classList.toggle('active')
    let popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

function showSentMessage(event) {
    event.preventDefault();
    var sentMessage = document.getElementById("sentMessage");
    sentMessage.style.display = "block";
    setTimeout(function() {
        window.location.href = "map.html";
    }, 500); 
}