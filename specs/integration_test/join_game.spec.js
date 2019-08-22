/* eslint-disable no-unused-expressions */
/* eslint-env mocha */

const chai = require('chai');

const { assert } = chai;
const { joinGame } = require('../../src/API/use_cases/join_game');
const { sampleData } = require('../_helpers/data.helper');
const { Game } = require('../../src/domain/entities/game');
const { GamesRepository } = require('../../src/domain/repositories/games');

describe('Integration Test: Join games', () => {
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

    const result = joinGame(sampleData.game.ownerId, 2);
    assert.equal(result, true);
  });

  it('SAD: should return a boolean value', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    GamesRepository.save(game);

    const result = joinGame(55555, 2);
    assert.equal(result, false);
  });

  it('SAD: should return a boolean value', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    GamesRepository.save(game);

    const result = joinGame(55555);
    assert.equal(result, false);
  });
});
