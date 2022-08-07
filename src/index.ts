import express from 'express';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import environment from 'single_tons/environment';
import makeSession from 'single_tons/make-session';
import { socketConnectionHandler } from './socket';

// exported for testing
export const app = express();

// middlewares
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: "*" }));
app.use(makeSession(environment.secret));
app.use(cookieParser());

// routes

// exported for testing
export const server = http.createServer(app);

const io = new SocketServer(server);
const socket = io.on('connection', socketConnectionHandler);
app.set('socket', socket);

server.listen(environment.port, () => {
    console.log(`🚀  Running on http://localhost:${environment.port}`);
});