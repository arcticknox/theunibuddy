import mongoose from 'mongoose';
import app from './api/app.js';
import centralErrorHandler from './api/utils/centralErrorHandler.js';

const port = 8080;

const initMongoConn = () => {
	mongoose
		.connect('mongodb://localhost:27017/testdb')
		.then(() => {
			console.info('MongoDB connected.');
		})
		.catch((err) => {
			console.error('MongoDB connection failure!');
		});
};

app.listen(port, () => {
	initMongoConn();
	console.log('Server listening on port', port);
});

// Centralized error handler
app.use((err, req, res, next) => {
	centralErrorHandler(err, res);
});

process.on('uncaughtException', (error) => {
	centralErrorHandler(error);
});

process.on('unhandledRejection', (reason) => {
	centralErrorHandler(reason);
});
