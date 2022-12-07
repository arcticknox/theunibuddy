import { Server } from 'socket.io';

/**
 * Initialize socket connection
 * @param {Object} server
 * @returns {Object}
 */
const initSocketServer = (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    console.info('Socket server connected.');
    return io;
  } catch (err) {
    console.error('Socket server init error: ', err);
  }
};

export {
  initSocketServer,
};
