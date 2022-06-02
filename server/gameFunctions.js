const deckOriginal = require('./deck.json');

var uno = {
    players: [],
    deck_table: [],
};

module.exports = {
    emmitLog: function (io, msg) {
        io.emit('log', msg);
    },

    startGame: function (io) {
        uno.deck_table = local.shuffle(deckOriginal);
        
        uno.players.forEach(player => {
            player.hand = uno.deck_table.splice(0, 7);
        });

        local.emmitLog(io, "começooooouuuuuuuuuuu!");
        io.emit('players', uno.players);
    },

    shuffle: function (deck) { // Função para embaralhar o deck
        for (let i = deck.length - 1; i > 0; i--) { // Loop em todos os elementos
            const j = Math.floor(Math.random() * (i + 1)); // Escolhendo elemento aleatório
            [deck[i], deck[j]] = [deck[j], deck[i]]; // Reposicionando elemento
        }
        return deck; // Retornando array com aleatoriedade
    },

    addPlayer: function (io, name, socket) {
        uno.players.push(
            {
                name: name,
                socket_id: socket.id,
                hand: [],
                play: false,
                owner: uno.players.length > 0 ? false : true,
            }
        );
        local.emmitLog(io, name + " entrou na sala!");
        io.emit('players', uno.players);
    },

    removePlayer: function (io, socket) {
        var player = uno.players.filter(p => p.socket_id == socket.id)[0];
        if (player) {
            uno.players.splice(uno.players.indexOf(player), 1);
            local.emmitLog(io, player.name + " saiu da sala!");

            if (player.owner == true && uno.players.length > 0)
                uno.players[0].owner = true;

            io.emit('players', uno.players);
        }
    },
}

var local = module.exports