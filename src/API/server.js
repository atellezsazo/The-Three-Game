const express = require('express');
const httpStatus = require('http-status');
const http = require('http');

const game = require('./sockets/game');

const start = (options) => new Promise((resolve, reject) => {
  const app = express();

  app.use((err, req, res, next) => {
    reject(new Error(`Something went wrong!, err:${err}`));
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    next();
  });

  // Creating a fake WebClient for a LiveDemo
  app.get('/*', express.static(options.publicPath));

  const server = http.createServer(app)
    .listen(options.port);

  game(server);

  resolve(server);
});

module.exports = { start };
