let pack = {
    textures: {
	   base: [
       blocks = [
         cobblestone = "blocks/cobblestone.json",
         stone = "blocks/stone.json",
         dirt = "blocks/dirt.json"
       ],
      items = [
        stick = "items.stick.json",
        wooden_pickaxe = "items/wooden_pickaxe.json"
      ]
     ]
   }
 }

var test = JSON.stringify(pack);

// helper function: log message to screen
function log(msg) {
  document.getElementById("log").textContent += msg + "\n";
}
// setup websocket with callbacks
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
  ws.send(test);
}