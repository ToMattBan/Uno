export default {
  init: function (gs) {
    var that = this;

    var btn_start = document.querySelector("#btn_start button");
    btn_start.addEventListener("click", function () {
      gs.set_game_started(true);
      gs.get_socket().emit("start_game");
      that.hiddeBtnStart(true);
    });
  },

  hiddeBtnStart: function (hidden) {
    if (hidden) {
      document.querySelector("#btn_start").style = "display: none";
      document.querySelector("#table_cards").style = "";
    } else {
      document.querySelector("#btn_start").style = "";
      document.querySelector("#table_cards").style = "display: none";
    }
  },

  appendChild: function (ul, configs) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(configs.text));

    if (configs.style_classes) {
      configs.style_classes.forEach((classe) => {
        li.classList.add(classe);
      });
    }

    ul.appendChild(li);
  },

  addCards: function(hand) {
    const game_hand = document.querySelector("#my_cards");
  
    hand.forEach((card) => {
      let config = {
        text: card.name,
        style_classes: ["card", `card_color_${card.color}`],
      };
  
      this.appendChild(game_hand, config);
    });
  }
};
