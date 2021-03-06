const wsUri = "wss://echo.websocket.org/";
const locationUri = "https://www.openstreetmap.org/#map=8/"

const chat = document.querySelector(".chat");
const btnSend = document.querySelector('.js-btn-send');
const btnGeo = document.querySelector('.js-btn-geo');
let websocket = new WebSocket(wsUri);

function displayMessage(message, messageType) {
    let pre = document.createElement("div");
    pre.classList.add("message");

    switch (messageType) {
        case 'send':
            pre.classList.add("sent-message");
            pre.style.wordWrap = "" 
            pre.innerHTML = message;
            break;
        case 'location':
            pre.classList.add("sent-message");
            const link = document.createElement('a');
            link.setAttribute('href', message);
            link.innerText = "Гео-локация";
            pre.appendChild(link);
            break;
        default:
            pre.classList.add("recieved-message");
            pre.style.wordWrap = "" 
            pre.innerHTML = message;
            break;
    }
    chat.appendChild(pre);
}

websocket.onopen = function(e){
    const button = document.querySelectorAll('.js-btn');
    button.forEach(btn => btn.disabled = false);
}

websocket.onmessage = function(e) {
    displayMessage(e.data)
};

websocket.onerror = function(e) {
    console.log(e.data)
};

btnSend.addEventListener('click', () => {
    const message = document.querySelector(".js-input").value;
    console.log(message);
    if (message.length > 0) displayMessage(message, "send");
    websocket.send(message);     
});

btnGeo.addEventListener('click', () => {
    console.log(`object`);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            console.log(coords.latitude, coords.longitude);
            const message = locationUri + `${coords.latitude}/${coords.longitude}`
            displayMessage(message, "location");
        });
    } else {
        alert('Error [location]')
    }
})