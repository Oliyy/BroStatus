import dotenv from 'dotenv';
import http from 'http';
import sockjs from 'sockjs';
import connectionController from './controllers/connection.js';

// load the environment variables from the .env file
dotenv.config({
  path: '.env',
});

const app = () => {
  let socket;
  return {
    async build() {
      // build sockjs server
      socket = sockjs.createServer();
      const server = http.createServer();
      socket.installHandlers(server, { prefix: process.env.ROUTE_PREFIX });
      server.listen(process.env.PORT, process.env.IP);

      // new connection controller
      const ConnectionController = connectionController();
      await ConnectionController.build(socket);
    },
  };
};

const BroStatus = app();
await BroStatus.build();
export default BroStatus;
