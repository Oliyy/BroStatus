import SockJS from 'sockjs-client';
import request from './request';
import {
  socketRequest, stateFunctions, person, status,
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
      const requestData: socketRequest = { type: 'getStatus' };
      request(requestData, sock);
    };

    sock.onmessage = function (message) {
      const response = JSON.parse(message.data);
      console.log('message', response);

      const { peopleStatus } = response;

      console.log(peopleStatus);
      functions.setPeopleStatus(peopleStatus);
    };

    sock.onclose = function () {
      console.log('close');
      functions.setConnected(false);
    };
  },
  async updateStatus(data: person) {
    const updateStatus: socketRequest = { type: 'updateStatus', ...data };
    console.log('updateStatus', updateStatus)
    request(updateStatus, sock);
  },
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
