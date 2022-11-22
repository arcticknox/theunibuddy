import config from './config/index.js';
import mongoose from 'mongoose';
import app from './api/app.js';
import centralErrorHandler from './api/utils/centralErrorHandler.js';

const initMongoConn = () => {
  mongoose
      .connect(`mongodb://${config.mongodb.url}/${config.mongodb.dbName}`)
      .then(() => {
        console.info('MongoDB connected.');
      })
      .catch((err) => {
        console.error('MongoDB connection failure!');
      });
};

app.listen(config.app.port, () => {
  initMongoConn();
  console.log('Server listening on port', config.app.port);
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
