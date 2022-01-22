// import models
import Connections from '../models/Connections.js';

// import controllers
import Status from './status.js';

import response from '../utils/response.js';

/**
 * Creates a new connection controller instance
 * @class
 */
const connectionController = () => ({
  /**
   * Open listener for incoming connections on the socket
   * @async
   * @function build
   * @param {object} socket - The socket to listen on.
   */
  async build(socket) {
    socket.on('connection', (conn) => {
      // store new socket connection in memory
      Connections.addConnection(conn);

      // listen for incoming messages
      conn.on('data', async (message) => {
        let request;
        // try and parse request
        try {
          request = JSON.parse(message);
        } catch (err) {
          console.error(err);
          return;
        }

        // Route reuqests based on type
        switch (request.type) {
          case 'getStatusList':
            // sned list of available status'
            response(Status.getStatusList(), conn);
            break;

          case 'getStatus':
            // send reponse to client with current people status information
            response(Status.getStatus(), conn);
            break;

          case 'updateStatus':
            // Update the current status of an indvidual person
            // Send a message to all current connections with the updated status
            Connections.broadcastToConnections(Status.updateStatus(request));
            break;

          default:
            response({ message: 'Not found' }, conn);
        }
      });

      // remove connection from users
      conn.on('close', async () => {
        Connections.removeConnection(conn);
      });
    });
  },
});

export default connectionController;
