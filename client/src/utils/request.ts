import { socketRequest } from './interfaces';

// request function
export default function request(data: socketRequest, socket: any) {
  socket.send(JSON.stringify(data));
}
