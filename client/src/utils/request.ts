import { socketRequest } from './interfaces';

export default function request(data: socketRequest, socket: any) {
  socket.send(JSON.stringify(data));
}
