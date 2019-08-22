const { Game } = require('../../domain/entities/game');
const { GamesRepository } = require('../../domain/repositories/games');

const save = (nickname, startValue, ownerId) => {
  if (!nickname || !ownerId) {
    throw (new Error('Invalid game data'));
  }
  const game = new Game(nickname, startValue, ownerId);
  GamesRepository.save(game);
  return game;
};

exports.createGame = (nickname, startValue, ownerId) => {
  try {
    const newGame = save(nickname, startValue, ownerId);
    return newGame;
  } catch (e) {
    return false;
  }
};
