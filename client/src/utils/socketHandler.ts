import SockJS from 'sockjs-client';
import request from './request';
import {
  socketRequest, stateFunctions, person,
} from './interfaces';
import config from '../config.js';

const sock = new SockJS(config.socketUrl);

export const socketHandler = () => ({
  async start(functions: stateFunctions) {
    sock.onopen = function () {
      console.log('open');

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
      // todo: this should account for the status list returning too
      const response = JSON.parse(message.data);
      console.log('message', response);

      if (response.error) {
        return console.error('An error occurred');
      }

      // if message cotains people status list update state
      if (response.peopleStatus) {
        return functions.setPeopleStatus(response.peopleStatus);
      }

      if (response.statusListOptions) {
        return functions.setStatusList(response.statusListOptions);
      }
    };

    sock.onclose = function () {
      console.log('close');
      functions.setConnected(false);
    };
  },
  async updateStatus(data: person) {
    const updateStatus: socketRequest = { type: 'updateStatus', ...data };
    console.log('updateStatus', updateStatus);
    request(updateStatus, sock);
  }
});

//
// sock.onopen = function() {
//     console.log('open');
//
//     const getStatus: socketRequest = { type: 'updateStatus', status: { main: 'Chilling', sub: 'Do not disturb'}, person: { name: 'Oliy Barrett'} }
//     console.log(getStatus)
//     sock.send(JSON.stringify(getStatus));
// };
//

//
