class Round {
  constructor(
    value,
    player,
    currentValue,
    nextPlayer,
  ) {
    this.value = parseInt(value, 10);
    if (!Number.isInteger(this.value)
      || this.value < -1
      || this.value > 1) {
      throw (new Error('Invalid seed data'));
    }
    this.currentValue = currentValue;
    this.prevResult = parseInt(this.currentValue, 10) + parseInt(this.value, 10);
    this.nextValue = Math.floor(this.prevResult / 3);
    this.player = player;
    this.nextPlayer = nextPlayer;
  }
}
module.exports = {
  Round,
};
