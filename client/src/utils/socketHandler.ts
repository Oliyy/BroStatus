// import dependencies
import SockJS from 'sockjs-client';
import request from './request';
import {
  socketRequest, stateFunctions, person,
} from './interfaces';
import config from '../config.js';

// new SockJS instance
const sock = new SockJS(config.socketUrl);

// socket handler class
export const socketHandler = () => ({

  // start opens connection to socket server and listens for incoming messages
  async start(functions: stateFunctions) {
    sock.onopen = function () {
      // update UI state as connected to the socket
      functions.setConnected(true);

      // request people status from the socket
      const requestStatusData: socketRequest = { type: 'getStatus' };
      request(requestStatusData, sock);

      // request status list options from the backend
      const requestStatusListData: socketRequest = { type: 'getStatusList' };
      request(requestStatusListData, sock);
    };

    sock.onmessage = function (message) {
      // parse incoming message
      const response = JSON.parse(message.data);

      if (response.error) {
        return console.error('An error occurred');
      }

      // if message contains people status update state
      if (response.peopleStatus) {
        return functions.setPeopleStatus(response.peopleStatus);
      }

      // if message contains people status list update state
      if (response.statusListOptions) {
        return functions.setStatusList(response.statusListOptions);
      }
    };

    // handle socket connection closing
    sock.onclose = function () {
      console.log('close');
      functions.setConnected(false);
    };
  },
  // Function to update a user status
  async updateStatus(data: person) {
    const updateStatus: socketRequest = { type: 'updateStatus', ...data };
    request(updateStatus, sock);
  },
});
