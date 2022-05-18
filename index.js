const get_json = fetch("https://raw.githubusercontent.com/VelvetRemedy/pack-builder-server/mane/assets.json")
    .then((response) => response.json())
    .then((user) => {
        return user.repos;
    }
);

const generate_options = async () => {
    const assets = await get_json;
    document.querySelector("#builder").innerHTML = "";
    for (c in assets.addons) {
        document.querySelector("#builder").innerHTML += `<div id="${assets.addons[c].name}"></div>`;
        for (a in assets.addons[c].variants) {
            if (assets.addons[c].default == assets.addons[c].variants[a].id) {
                document.querySelector(`#${assets.addons[c].name}`).innerHTML += `<div>
                    <input type="radio" value="${assets.addons[c].variants[a].name}" name="${assets.addons[c].name}" checked="true"><p>${assets.addons[c].variants[a].name}</p></input>
                </div>`;
            } else {
                document.querySelector(`#${assets.addons[c].name}`).innerHTML += `<div>
                    <input type="radio" value="${assets.addons[c].variants[a].name}" name="${assets.addons[c].name}"><p>${assets.addons[c].variants[a].name}</p></input>
                </div>`;
            }
        }
    }
};

function get_selected() {
    var selections = document.querySelectorAll('input[type="radio"]:checked');
    for (var selected of selections) {
        document.getElementById("log").textContent += selected.value + "\n";
    }
}

function load_assets() {
    generate_options();
};

function log(msg) {
    document.getElementById("log").textContent += msg + "\n";
};

var ws = new WebSocket("ws://mc.love-tolerance.com:24808/");
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
    ws.send("Pinkie Pie is best pony!");
};

load_assets();
