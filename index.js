const { serverSettings } = require('./config');
const server = require('./src/API/server');

server.start({
  port: serverSettings.port,
  publicPath: serverSettings.publicPath,
});
