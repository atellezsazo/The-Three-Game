let games = [];

const save = (game) => {
  games.push(game);
  return game;
};

const removeByUserId = (userId) => {
  games = games.filter((game) => game.users.owner !== userId
    && game.users.guest !== userId);
  return games;
};

const update = (game) => {
  removeByUserId(game.users.owner);
  return save(game);
};

const findByOwnerId = (ownerId) => games
  .find((game) => game.users.owner === ownerId);

const findByUsersId = (userId) => games
  .find((game) => game.users.owner === userId
    || game.users.guest === userId);

const getAllActiveGames = () => games.filter((game) => game.status !== 'playing');

const purgeData = () => { games = []; };

exports.GamesRepository = {
  findByOwnerId,
  findByUsersId,
  getAllActiveGames,
  purgeData,
  removeByUserId,
  save,
  update,
};
