import express from 'express';
import { config } from 'dotenv';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});
io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
	});
});

const startServer = async () => {
	try {
		server.listen(process.env.PORT, () => {
			console.log(`Сервер был запущен на порту ${process.env.PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};
startServer();
