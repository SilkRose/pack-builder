let obj = null;

async function load() {
    let url = 'https://raw.githubusercontent.com/VelvetRemedy/pack-release-builder/mane/assets.json';
    try {
        obj = await (await fetch(url)).json();
    } catch(e) {
        console.log('error');
    }
}

load();

function log(msg) {
  document.getElementById("log").textContent += msg + "\n";
}

var ws = new WebSocket("ws://localhost:8080/");
ws.onopen = function () {
  log("CONNECT");
};
ws.onclose = function () {
  log("DISCONNECT");
};
ws.onmessage = function (event) {
  log("MESSAGE: " + event.data);
};
function sendMessage() {
  var msgtxt = document.getElementById("id").value;
  var test = JSON.stringify(obj);
  ws.send(test);
}