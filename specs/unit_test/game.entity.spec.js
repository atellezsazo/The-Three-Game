/* eslint-env mocha */

const chai = require('chai');

const { expect, assert } = chai;
const { sampleData } = require('../_helpers/data.helper');

const { Game } = require('../../src/domain/entities/game');
const { Round } = require('../../src/domain/entities/children/round');

const { getRandomInt } = require('../../src/domain/entities/values/seed');

describe('[Game Entity] Unit Test: Create game Entity', () => {
  it('HAPPY: should return a game entity', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    assert.equal(game.nickname, sampleData.game.nickname);
    assert.equal(game.startValue, sampleData.game.startValue);
    assert.equal(game.currentValue, sampleData.game.startValue);
    assert.equal(game.users.owner, sampleData.game.ownerId);
    assert.equal(game.status, 'waiting opponent');
    assert.isNull(game.users.guest);
  });

  it('HAPPY: should return a game entity', () => {
    const game = new Game(
      sampleData.game.nickname,
      '',
      sampleData.game.ownerId,
    );

    assert.equal(game.nickname, sampleData.game.nickname);
    assert.isNumber(game.startValue);
    assert.isNumber(game.currentValue);
    assert.equal(game.users.owner, sampleData.game.ownerId);
    assert.equal(game.status, 'waiting opponent');
    assert.isNull(game.users.guest);
  });

  it('SAD: should throw a error entity', () => {
    expect(() => new Game(
      sampleData.game.nickname,
      'bad-value',
      sampleData.game.ownerId,
    )).to.throw();
  });
});

describe('[Game Entity] Unit Test: Random number Value', () => {
  it('HAPPY: should return a random number', () => {
    const number = getRandomInt();
    assert.isNumber(number);
  });
});

describe('[Game Entity] Unit Test: Add round ', () => {
  it('HAPPY: should return a round array', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );
    game.addGuest(2);
    const round = new Round(1, sampleData.game.ownerId, game.currentValue, 2);
    game.addRound(round);
    game.setCurrentValue(round.nextValue);

    assert.equal(game.rounds.length, 1);
    assert.equal(game.currentValue, round.nextValue);
  });


  it('SAD: should return a round error', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );
    game.addGuest(2);
    expect(() => new Round('invalid - data',
      sampleData.game.ownerId,
      game.currentValue,
      2))
      .to.throw();
  });
});
