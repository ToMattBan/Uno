const express = require('express');
const path = require('path');
const app = express(); // Realiza o require do express, http, e socketio
const http = require('http').Server(app); // passa o express para o http-server
const io = require('socket.io')(http); // passa o http-server para o socketio
const gameFunctions = require('./gameFunctions');

app.use(express.static(path.join(__dirname, '..', 'public')));

// cria uma rota para fornecer o arquivo index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
io.on('connection', function (socket) {
  socket.on('add_player', function (name) {
    gameFunctions.addPlayer(io, name, socket);
  });

  socket.on('disconnect', function () {
    gameFunctions.removePlayer(io, socket);
  });

  socket.on('start_game', function () {
    gameFunctions.startGame(io, socket);
  });
});

// inicia o servidor na porta informada, no caso vamo iniciar na porta 3000
http.listen(3000, function () {
  console.log('Servidor rodando em: http://localhost:3000');
});