import response from '../utils/response.js';

/**
 * Creates a new connection model instance
 * @class
 */
const connections = () => {
  // Array to store current socket connections in memory
  let currentConnections = [];
  return {
    /**
     * Get all current socket connections
     * @function getConnections
     * @return {array} Returns an array with all connnetions
     */
    getConnections() {
      return currentConnections;
    },

    /**
     * Add connection to array for storage
     * @function addConnection
     * @param {Object<connection>} connection - connection object from SockJS
     */
    addConnection(connection) {
      currentConnections.push(connection);
    },

    /**
     * Remove connection from storage array when client disconnects
     * @function removeConnection
     * @param {Object<connection>} connection - connection object from SockJS
     */
    removeConnection(connection) {
      currentConnections = currentConnections.filter((conn) => conn.id !== connection.id);
    },

    /**
     * Broadcast to all connections on the socket with data
     * @function broadcastToConnections
     * @param {Object<data>} data - data to broadcast
     */
    broadcastToConnections(data) {
      currentConnections.forEach((conn) => {
        response(data, conn);
      });
    },
  };
};

// new connections instance
const Connections = connections();
export default Connections;
