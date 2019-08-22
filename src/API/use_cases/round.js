const { Round } = require('../../domain/entities/children/round');
const { GamesRepository } = require('../../domain/repositories/games');

const calculate = (game, userId, value) => {
  if (!game) {
    throw (new Error('We could not get your game'));
  }

  if ((game.rounds.length === 0 && userId === game.users.owner)
    || (game.rounds.length > 0
      && game.rounds[game.rounds.length - 1].player === userId)) {
    throw (new Error('It is not your turn'));
  }

  const nextPlayer = userId === game.users.owner
    ? game.users.guest : game.users.owner;

  const round = new Round(value, userId, game.currentValue, nextPlayer);
  game.addRound(round);
  game.setCurrentValue(round.nextValue);
  GamesRepository.update(game);
  return round;
};

exports.round = (userId, value) => {
  const game = GamesRepository.findByUsersId(userId);
  try {
    return calculate(game, userId, value);
  } catch (e) {
    return false;
  }
};
