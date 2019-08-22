/* eslint-disable no-unused-expressions */
/* eslint-env mocha */

const chai = require('chai');

const { assert } = chai;
const { removeGames } = require('../../src/API/use_cases/remove_games');
const { sampleData } = require('../_helpers/data.helper');
const { Game } = require('../../src/domain/entities/game');
const { GamesRepository } = require('../../src/domain/repositories/games');

describe('Integration Test: Remove games', () => {
  beforeEach((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a boolean value', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    GamesRepository.save(game);

    const { games, disconnectedGame } = removeGames(sampleData.game.ownerId);

    assert.isEmpty(games);
    assert.isNotEmpty(disconnectedGame);
  });
});
