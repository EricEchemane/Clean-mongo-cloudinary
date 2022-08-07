import express from 'express';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import environment from 'utils/environment';
import makeSession from 'utils/make-session';
import mongoose from 'mongoose';
import { socketConnectionHandler } from './socket';
import userRoutes from '@api/routes/user.routes';

// exported for testing
export const app = express();

// middlewares
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: "*" }));
app.use(makeSession(environment.secret));
app.use(cookieParser());

// routes
app.use('/user', userRoutes);

// exported for testing
export const server = http.createServer(app);

const io = new SocketServer(server);
const socket = io.on('connection', socketConnectionHandler);
app.set('socket', socket);

const start = async () => {
    try {
        await mongoose.connect(environment.MONGODB_URI);
        server.listen(environment.port, () => {
            console.log(`🚀  Running on http://localhost:${environment.port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();