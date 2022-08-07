import type { Socket } from "socket.io";

export function socketConnectionHandler(socket: Socket) {
    socket.on('hello message', msg => {
        console.log('just got: ', msg);
        socket.emit('chat message', 'hi from server');
    });
    console.log('connection success');
}