import domChanger from "./domChanger.js";
// ---------------- Starting the app ---------------- //

var game_started = false,
  socket = io(),
  me = {};

var uno = {
  players: [],
  deck_table: [],
};

//var nome_usuario = prompt("Qual seu nome?");
var nome_usuario = "teste";
if (nome_usuario === null || nome_usuario == "" || nome_usuario == " ") {
  document.location.reload(true);
}

socket.emit("add_player", nome_usuario);

// ---------------- Actions to change the DOM ---------------- //

const get_socket = () => socket;
const set_game_started = (val) => (game_started = val);
domChanger.init(get_socket, set_game_started);


// ---------------- Actions the socket receive ---------------- //

socket.on("players", function (players) {
  me = players.filter((p) => p.socket_id == socket.id)[0];
  console.log(me);

  domChanger.addCards(me.hand);

  if (me.owner == true && game_started == false) {
    domChanger.hiddeBtnStart(false);
  }

  let ul = document.getElementById("players");
  ul.innerHTML = "";

  players.forEach((element) => {
    domChanger.appendChild(ul, { text: element.name });
  });
});

socket.on("log", function (log) {
  let ul = document.getElementById("log");
  domChanger.appendChild(ul, { text: log });
});

socket.on("console", function (param) {
  console.log(param);
});
