import { Server } from 'socket.io';
import { messagedbManager, productdbManager } from '../../dao/index.managers.js';

//<-------------<VARIABLES>------------>
const totalMessages = [];// Variable que recibe los mensajes del chat. 
let messagesdb;  // Variable formateada para que se envie los mensajes con el user como mail.


//Configuracion socket.io
export default class SocketManager {
    constructor(server) {
        this.io = new Server(server);
        this.socket = null;
        this.initialized();
    }

    async initialized() {
        this.io.on('connection', async socket => {
            const clientId = socket.id;
            console.log('============================================================');
            console.log(`Nuevo usuario conectado: ClienteID-${clientId}`);
            console.log('============================================================');

            this.userDisconnect(socket);
            this.emitProducts();
            this.onChat(socket);
        });
    };

    async userDisconnect(socket) {
        socket.on('disconnect', async () => {
            const route = socket.handshake.headers.referer;
            console.log(`Clente desconectado desde la ruta: ${route}`);
        });
    };
    async emitProducts() {
        const productsdb = await productdbManager.getProducts();
        this.io.emit('products', productsdb);
    };

    async onChat(socket) {
        socket.on('message', async data => {
            const { message, email } = data;
            messagesdb = {
                user: email,
                message: message
            };
            totalMessages.push(data);
            let lastMessage = [totalMessages[totalMessages.length - 1]];
            this.io.emit('messageLogs', lastMessage);
            await messagedbManager.createMessage(messagesdb);
        });

        socket.on('authenticated', data => {
            socket.broadcast.emit('nuevoUsuario', data);
        });

    }
};