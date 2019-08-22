const socketIO = require('socket.io');

const { createGame } = require('../use_cases/create_game');
const { joinGame } = require('../use_cases/join_game');
const { round } = require('../use_cases/round');
const { gamesList } = require('../use_cases/games_list');
const { removeGames } = require('../use_cases/remove_games');

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    io.emit('active-games', gamesList());

    socket.on('new-game', ({ nickname, startValue }) => {
      if (createGame(nickname, startValue, socket.id)) {
        io.to(socket.id).emit('waiting-opponent', 'Waiting your opponent!');
        io.emit('active-games', gamesList());
      } else {
        io.to(socket.id).emit('error', 'Check your game data');
      }
    });

    socket.on('join-game', (ownerId) => {
      if (joinGame(ownerId, socket.id)) {
        io.to(socket.id).emit('your-round');
      } else {
        io.to(socket.id).emit('error', 'Wop! This is awkward, we could not join you to this game.');
      }
      io.emit('active-games', gamesList());
    });

    socket.on('round', (value) => {
      const playerRound = round(socket.id, value);
      if (playerRound) {
        if (playerRound.nextValue === 1) {
          io.to(socket.id).emit('winner');
          io.to(playerRound.nextPlayer).emit('game-over');
        } else if (playerRound.nextValue < 2) {
          io.to(socket.id).to(playerRound.nextPlayer).emit('game-over');
        } else {
          io.to(playerRound.nextPlayer).emit('your-round');
        }
      } else {
        io.to(socket.id).emit('error', 'Wop! This is awkward, we could not process this action.');
      }
    });

    socket.on('disconnect', () => {
      const { games, disconnectedGame } = removeGames(socket.id);
      if (disconnectedGame) {
        io.to(disconnectedGame.users.owner)
          .to(disconnectedGame.users.guest)
          .emit('error', 'Opponent has disconnected');
      }
      io.emit('active-games', games);
    });
  });
};
