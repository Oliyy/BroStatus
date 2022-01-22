// third party deps
import dotenv from 'dotenv';
import http from 'http';
import sockjs from 'sockjs';

// import controllers
import connectionController from './controllers/connection.js';

// load the environment variables from the .env file
dotenv.config({
  path: '.env',
});

/**
 * Creates a new app
 * @class
 */
const app = () => ({
  /**
     * Create new web server and open socket
     * @function build
     */
  async build() {
    // build sockjs server
    const socket = sockjs.createServer();
    const server = http.createServer();
    socket.installHandlers(server, { prefix: process.env.ROUTE_PREFIX });
    server.listen(process.env.PORT, process.env.IP);

    // new connection controller
    const ConnectionController = connectionController();
    await ConnectionController.build(socket);
  },
});

// new instance of the app
const BroStatus = app();

// build app
await BroStatus.build();
export default BroStatus;
