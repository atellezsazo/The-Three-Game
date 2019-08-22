const { GamesRepository } = require('../../domain/repositories/games');

exports.removeGames = (userId) => {
  const disconnectedGame = GamesRepository.findByUsersId(userId);
  const games = GamesRepository.removeByUserId(userId);
  return {
    games,
    disconnectedGame,
  };
};
