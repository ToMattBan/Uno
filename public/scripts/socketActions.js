import domChanger from "./domChanger.js";

export default {
  init: function (gs) {
    // Esse é o único que dá pra deixar como const, já que é o único imutável.
    const socket = gs.get_socket();

    socket.on("players", function (players) {
      gs.set_me(players.filter((p) => p.socket_id == socket.id)[0]);
      const me = gs.get_me();

      console.log(me);

      domChanger.addCards(me.hand);

      if (me.owner == true && gs.get_game_started() == false) {
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
  },
};
