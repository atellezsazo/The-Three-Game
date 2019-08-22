/* eslint-disable no-unused-expressions */
/* eslint-env mocha */

const chai = require('chai');

const { assert } = chai;
const { gamesList } = require('../../src/API/use_cases/games_list');
const { sampleData } = require('../_helpers/data.helper');
const { Game } = require('../../src/domain/entities/game');
const { GamesRepository } = require('../../src/domain/repositories/games');

describe('Integration Test: List games', () => {
  beforeEach((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a game entity', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    const game2 = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    GamesRepository.save(game);
    GamesRepository.save(game2);

    const games = gamesList();
    assert.equal(games.length, 2);
  });
});
