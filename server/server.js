import config from './config/index.js';
import mongoose from 'mongoose';
import stoppable from 'stoppable';
import app from './api/app.js';
import centralErrorHandler from './api/utils/centralErrorHandler.js';
import { initSocketServer } from './socket/index.js';
import { socketConnectionStore } from './socket/connectionStore.js';
import http from 'http';

const httpServer = http.createServer(app);

const io = initSocketServer(httpServer);

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

const server = stoppable(
    httpServer.listen(config.app.port, () => {
      initMongoConn();
      socketConnectionStore(io);
      console.log('Server listening on port', config.app.port);
    }));

process.on('uncaughtException', (error) => {
  centralErrorHandler(error);
});

process.on('unhandledRejection', (reason) => {
  centralErrorHandler(reason);
});

const shutdown = () => {
  server.close((err) => {
    if (err) {
      console.error('Error detected during shutdown', err);
      process.exitCode = 1;
    }
    console.log('MongoDB gracefully disconnected');
    mongoose.connection.close();
    io.close(); // Close socket conn
    process.exit();
  });
};


// Quit on CTRL - C when running Docker in Terminal
process.on('SIGINT', ()=>{
  console.log('Received SIGINT, gracefully shutting down');
  shutdown();
});

// Quit on docker stop command
process.on('SIGTERM', () => {
  console.info('Received SIGTERM, gracefully shutting down');
  shutdown();
});
