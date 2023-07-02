export { connectionMongo } from './mongoatlas/mongo.config.js';
export { default as SocketManager } from './socketio/socketio.config.js';

export const config = {
    PORT: process.env.PORT || 8081,
};