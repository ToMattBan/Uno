// ---------------- Starting the app ---------------- //

var game_started = false,
    socket = io(),
    me = {};

var uno = {
    players: [],
    deck_table: [],
};

var nome_usuario = prompt("Qual seu nome?");
if (nome_usuario === null || nome_usuario == "" || nome_usuario == " ") {
    document.location.reload(true);
};

socket.emit('add_player', nome_usuario);


// ---------------- Actions to change the DOM ---------------- //


function start_game() {
    game_started = true;
    socket.emit('start_game');
    hiddeBtnStart(true);
};

function hiddeBtnStart(hidden) {
    document.querySelector('#btn_start').hidden = hidden;

    if (hidden)
        document.querySelector('#table_cards').style = "";
    else
        document.querySelector('#table_cards').style = "display: none";
};

function appendChild(ul, configs) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(configs.text));

    if (configs.style_classes) {
        configs.style_classes.forEach(classe => {
            li.classList.add(classe);
        })
    }

    ul.appendChild(li);
};

function addCards(hand) {
    const game_hand = document.querySelector('#my_cards');

    hand.forEach(card => {
        let config = {
            text: card.name,
            style_classes: ['card', `card_color_${card.color}`]
        };

        appendChild(game_hand, config)
    })
};

// ---------------- Actions the socket receive ---------------- //


socket.on('players', function (players) {
    me = players.filter(p => p.socket_id == socket.id)[0];
    console.log(me);

    addCards(me.hand);

    if (me.owner == true && game_started == false) {
        hiddeBtnStart(false);
    }

    let ul = document.getElementById("players");
    ul.innerHTML = '';

    players.forEach(element => {
        appendChild(ul, { text: element.name });
    });
});

socket.on('log', function (log) {
    let ul = document.getElementById("log");
    appendChild(ul, { text: log });
});

socket.on('console', function (param) {
    console.log(param);
});