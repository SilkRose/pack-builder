const get_json = fetch("https://raw.githubusercontent.com/VelvetRemedy/pack-release-builder/mane/assets.json")
    .then((response) => response.json())
    .then((user) => {
        return user.repos;
    });

const generate_options = async () => {
    const assets = await get_json;
    document.querySelector("#builder").innerHTML = "";
    for (c in assets.addons) {
        console.log(assets.addons[c]);
    }
};

function load_assets() {
    generate_options();
}

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

load_assets();
