import response from '../utils/response.js';

const connections = () => {
  let currentConnections = [];
  return {
    getConnections() {
      return currentConnections;
    },
    addConnection(connection) {
      currentConnections.push(connection);
    },
    removeConnection(connection) {
      currentConnections = currentConnections.filter((conn) => conn.id !== connection.id);
    },
    broadcastToConnections(data) {
      currentConnections.forEach((conn) => {
        response(data, conn)
      })
    }
  };
};

const Connections = connections();
export default Connections;
