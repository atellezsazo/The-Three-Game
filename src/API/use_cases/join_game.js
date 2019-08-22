const { GamesRepository } = require('../../domain/repositories/games');

const updateGame = (ownerId, guestId) => {
  if (!guestId || !ownerId) {
    throw (new Error('Invalid game data'));
  }
  const game = GamesRepository.findByOwnerId(ownerId);

  if (!game) {
    throw (new Error('Invalid game'));
  }

  game.addGuest(guestId);
  GamesRepository.update(game);
  return game;
};

exports.joinGame = (ownerId, guestId) => {
  try {
    updateGame(ownerId, guestId);
    return true;
  } catch (e) {
    return false;
  }
};
