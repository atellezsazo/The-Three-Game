const { getRandomInt } = require('./values/seed');

class Game {
  constructor(
    nickname,
    startValue,
    owner,
  ) {
    this.nickname = nickname;
    this.startValue = !startValue || startValue === '' ? getRandomInt() : parseInt(startValue, 10);
    this.users = {
      owner,
      guest: null,
    };
    this.status = 'waiting opponent';
    this.rounds = [];

    if (!Number.isInteger(this.startValue)) {
      throw (new Error('Invalid seed data'));
    }
    this.currentValue = this.startValue;
  }

  addGuest(guestId) {
    this.users.guest = guestId;
    this.status = 'playing';
  }

  addRound(round) {
    this.rounds.push(round);
  }

  setCurrentValue(currentValue) {
    this.currentValue = currentValue;
  }
}
module.exports = {
  Game,
};
