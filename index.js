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
                    <input type="radio" id="${assets.addons[c].variants[a].id}" value="${assets.addons[c].variants[a].name}" name="${assets.addons[c].name}" checked="true"><p>${assets.addons[c].variants[a].name}</p></input>
                </div>`;
            } else {
                document.querySelector(`#${assets.addons[c].name}`).innerHTML += `<div>
                    <input type="radio" id="${assets.addons[c].variants[a].id}" value="${assets.addons[c].variants[a].name}" name="${assets.addons[c].name}"><p>${assets.addons[c].variants[a].name}</p></input>
                </div>`;
            }
        }
    }
};

function get_selected() {
    var selections = document.querySelectorAll('input[type="radio"]:checked');
    var id = "ID";
    for (var selected of selections) {
        id = id.concat("-", selected.id);
    }
}

function load_assets() {
    generate_options();
};

function log(msg) {
    document.getElementById("log").textContent += msg + "\n";
};

function connect() {
    return new Promise(function(resolve, reject) {
        var server = new WebSocket("ws://mc.love-tolerance.com:24808/");
        server.onopen = function() {
            resolve(server);
        };
        server.onerror = function(err) {
            reject(err);
        };

    });
}

function connect_ws() {
    connect().then(function(server) {
        server.send("test");
        server.onmessage = function (event) {
            log("MESSAGE: " + event.data);
            console.log(event.data);
            server.close();
        };
    }).catch(function(err) {
        throw(err);
    });
}

load_assets();
