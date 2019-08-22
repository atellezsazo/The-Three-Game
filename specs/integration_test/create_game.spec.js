/* eslint-disable no-unused-expressions */
/* eslint-env mocha */

const chai = require('chai');

const { assert } = chai;
const { createGame } = require('../../src/API/use_cases/create_game');
const { sampleData } = require('../_helpers/data.helper');
const { GamesRepository } = require('../../src/domain/repositories/games');

describe('Integration Test: Create game', () => {
  beforeEach((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a game entity', () => {
    const game = createGame(sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId);

    assert.equal(game.nickname, sampleData.game.nickname);
    assert.equal(game.startValue, sampleData.game.startValue);
    assert.equal(game.currentValue, sampleData.game.startValue);
    assert.equal(game.users.owner, sampleData.game.ownerId);
    assert.equal(game.status, 'waiting opponent');
    assert.isNull(game.users.guest);
  });

  it('SAD: should return boolean false', () => {
    const game = createGame(sampleData.game.nickname,
      'invalid-data',
      sampleData.game.ownerId);

    assert.equal(game, false);
  });

  it('SAD: should return boolean false', () => {
    const game = createGame(sampleData.game.nickname,
      'invalid-data');

    assert.equal(game, false);
  });
});
