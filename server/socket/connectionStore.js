import _ from 'lodash';
import TokenService from '../api/services/token.service.js';

/**
 * Store
 * Stores socket objects of connected clients
 * 'userId' : {socketObject}
 */
const store = {}; // TODO: Use redis

/**
 * Socket connections store
 * @param {Object} io
 */
const connectionStore = async (io) => {
  io.on('connection', async (socket) => {
    console.log(`Client ${socket.id} connected.`);
    // Add to store
    socket.on('subscribe', async (payload) => {
      const { id, accessToken } = payload;
      const verifiedToken = await TokenService.verifySocketAccessToken(accessToken, id);
      if (!verifiedToken) throw new Error('Socket subscribe verification failed');
      store[`${id}`] = socket;
      console.info('[Store] connections: ', _.size(store));
    });
  });
};

/**
 * Get socket client from store
 * @param {String} socketId
 * @returns {Object}
 */
const getClientFromStore = async (userId) => {
  return store[`${userId}`];
};

/**
 * Send message to client
 * @param {String} socketId
 * @param {String} event
 * @param {String} message
 */
const sendMessageToClient = async (userId, event, message) => {
  const socket = await getClientFromStore(userId);
  socket.emit(event, message);
};

export {
  connectionStore as socketConnectionStore,
  getClientFromStore,
  sendMessageToClient,
};
