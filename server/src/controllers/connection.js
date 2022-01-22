import Connections from '../models/Connections.js';
import People from '../models/People.js';

import Status from './status.js'

import response from '../utils/response.js'

const connectionController = () => ({
  async build(socket) {
    socket.on('connection', (conn) => {
      // store new socket connection in memory
      Connections.addConnection(conn);

      conn.on('data', async (message) => {
        let request;

        // try and parse request
        try {
          request = JSON.parse(message);
        } catch (err) {
          console.error(err);
          return;
        }

        console.log(request);

        switch (request.type) {

          case 'getStatus':
             response(await Status.getStatus(), conn);
          break;

          case 'updateStatus':
            const updatedStatus = Status.updateStatus(request)
            Connections.broadcastToConnections(updatedStatus)
          break;
        }


      });

      // remove connection from users
      conn.on('close', async (message) => {
        Connections.removeConnection(conn);
      });
    });
  },
});

export default connectionController;
