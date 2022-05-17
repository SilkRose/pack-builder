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
  ws.send(msgtxt);
}