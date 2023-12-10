import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Server } from 'socket.io';

import { notFound, errorHandler } from './middleware/error-middleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/user-routes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

io.on('connection', (socket) => {

    socket.on("join_room", (data) => {
        socket.join("global")
    })

    socket.on("send_message", (data) => {
        socket.to("global").emit("receive_message", data)
    })
});

server.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
