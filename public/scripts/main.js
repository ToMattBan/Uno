import domChanger from "./domChanger.js";
import socketActions from "./socketActions.js";
// ---------------- Starting the app ---------------- //

var game_started = false,
  socket = io(),
  me = {};

var uno = {
  players: [],
  deck_table: [],
};

const get_and_setters = {
  get_socket: () => socket,
  get_me: () => me,
  set_me: (val) => (me = val),
  get_game_started: () => game_started,
  set_game_started: (val) => (game_started = val),
}

domChanger.init(get_and_setters);
socketActions.init(get_and_setters);

// ---------------- Creating the player ---------------- //

//var nome_usuario = prompt("Qual seu nome?");
var nome_usuario = "teste";
if (nome_usuario === null || nome_usuario == "" || nome_usuario == " ") {
  document.location.reload(true);
}

socket.emit("add_player", nome_usuario);