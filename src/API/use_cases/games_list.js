const { GamesRepository } = require('../../domain/repositories/games');

exports.gamesList = () => GamesRepository.getAllActiveGames();
