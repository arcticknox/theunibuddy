import mongoose from 'mongoose';
import app from './api/app.js';

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
