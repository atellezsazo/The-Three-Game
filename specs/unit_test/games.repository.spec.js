/* eslint-disable no-unused-expressions */
/* eslint-env mocha */

const chai = require('chai');

const { expect, assert } = chai;
const { sampleData } = require('../_helpers/data.helper');

const { Game } = require('../../src/domain/entities/game');
const { GamesRepository } = require('../../src/domain/repositories/games');

describe('[Game Repository] Unit Test: Save game', () => {
  before((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a game entity', () => {
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    const newGame = GamesRepository.save(game);
    assert.equal(newGame.nickname, sampleData.game.nickname);
    assert.equal(newGame.startValue, sampleData.game.startValue);
    assert.equal(newGame.currentValue, sampleData.game.startValue);
    assert.equal(newGame.users.owner, sampleData.game.ownerId);
    assert.equal(newGame.status, 'waiting opponent');
    assert.isNull(newGame.users.guest);
  });
});

describe('[Game Repository] Unit Test: List games', () => {
  before((done) => {
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

    const games = GamesRepository.getAllActiveGames();
    assert.equal(games.length, 2);
  });
});

describe('[Game Repository] Unit Test: Find a game by Owner Id', () => {
  before((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a game entity', () => {
    GamesRepository.save(new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    ));

    const game = GamesRepository.findByOwnerId(sampleData.game.ownerId);

    assert.equal(game.nickname, sampleData.game.nickname);
    assert.equal(game.startValue, sampleData.game.startValue);
    assert.equal(game.currentValue, sampleData.game.startValue);
    assert.equal(game.users.owner, sampleData.game.ownerId);
    assert.equal(game.status, 'waiting opponent');
    assert.isNull(game.users.guest);
  });

  it('BAD: should return a empty entity', () => {
    GamesRepository.save(new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    ));

    const game = GamesRepository.findByOwnerId(3344);
    expect(game).to.be.undefined;
  });
});

describe('[Game Repository] Unit Test: Find a game by any user Id', () => {
  before((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a game entity', () => {
    GamesRepository.save(new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    ));

    const game = GamesRepository.findByUsersId(sampleData.game.ownerId);

    assert.equal(game.nickname, sampleData.game.nickname);
    assert.equal(game.startValue, sampleData.game.startValue);
    assert.equal(game.currentValue, sampleData.game.startValue);
    assert.equal(game.users.owner, sampleData.game.ownerId);
    assert.equal(game.status, 'waiting opponent');
    assert.isNull(game.users.guest);
  });

  it('BAD: should return a empty entity', () => {
    GamesRepository.save(new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    ));

    const game = GamesRepository.findByUsersId(3344);
    expect(game).to.be.undefined;
  });
});

describe('[Game Repository] Unit Test: Remove games', () => {
  before((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a game entity', () => {
    GamesRepository.purgeData();
    const game = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    );

    const game2 = new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      2,
    );

    GamesRepository.save(game);
    GamesRepository.save(game2);

    GamesRepository.removeByUserId('1');
    const games = GamesRepository.getAllActiveGames();
    assert.equal(games.length, 1);
  });

  it('SAD: should return games entities', () => {
    GamesRepository.purgeData();
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

    GamesRepository.removeByUserId(33);
    const games = GamesRepository.getAllActiveGames();
    assert.equal(games.length, 2);
  });
});

describe('[Game Repository] Unit Test: Update a Game', () => {
  before((done) => {
    GamesRepository.purgeData();
    done();
  });

  it('HAPPY: should return a game entity', () => {
    const game = GamesRepository.save(new Game(
      sampleData.game.nickname,
      sampleData.game.startValue,
      sampleData.game.ownerId,
    ));

    game.addGuest(3);
    const gameUpdate = GamesRepository.update(game);

    assert.equal(gameUpdate.nickname, sampleData.game.nickname);
    assert.equal(gameUpdate.startValue, sampleData.game.startValue);
    assert.equal(gameUpdate.currentValue, sampleData.game.startValue);
    assert.equal(gameUpdate.users.owner, sampleData.game.ownerId);
    assert.equal(gameUpdate.status, 'playing');
    assert.equal(gameUpdate.users.guest, 3);
  });
});
