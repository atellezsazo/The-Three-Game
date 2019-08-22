/* eslint-disable no-unused-expressions */
/* eslint-env mocha */

const chai = require('chai');

const { assert } = chai;
const { round } = require('../../src/API/use_cases/round');
const { sampleData } = require('../_helpers/data.helper');
const { Game } = require('../../src/domain/entities/game');
const { GamesRepository } = require('../../src/domain/repositories/games');

describe('Integration Test: Round games', () => {
  beforeEach((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a round entity', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    GamesRepository.save(game);
    game.addGuest(2);

    const nextRound = round(2, 1);
    assert.isNumber(nextRound.nextValue);
    assert.isNumber(nextRound.currentValue);
    assert.equal(nextRound.nextPlayer, 1);
  });

  it('SAD: should return false when the game does not exists', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    GamesRepository.save(game);
    game.addGuest(2);

    const nextRound = round(3, 1);
    assert.equal(nextRound, false);
  });

  it('BAD: should return false when is the incorrect player', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    GamesRepository.save(game);
    game.addGuest(2);

    round(2, -1); // First round
    const repeatingPlayer = round(2, -1);
    assert.equal(repeatingPlayer, false);
  });

  it('BAD: should return false when is the incorrect player', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    GamesRepository.save(game);
    game.addGuest(2);

    const result = round(sampleData.game.ownerId, -1); // First round
    assert.equal(result, false);
  });
});
