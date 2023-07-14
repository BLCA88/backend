export { connectionMongo } from './mongoatlas/mongo.config.js';
export { default as SocketManager } from './socketio/socketio.config.js';
import 'dotenv/config';

export const varenv = {
    PORT: process.env.PORT || 8081,
    MONGODB: process.env.MONGODB_ATLAS_USER || undefined,
    SECRET: process.env.SECRET || undefined
};