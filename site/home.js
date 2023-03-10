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

