import { Server } from 'socket.io';
import { productManager, messagedbManager, productdbManager } from '../../dao/index.managers.js';

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
            const ruta = socket.handshake.headers.referer;
            console.log(`Clente desconectado desde la ruta: ${ruta}`);
        });
    };
    async emitProducts() {
        const productosdb = await productdbManager.getProducts();
        this.io.emit('productos', productosdb);
    };

    async onChat(socket) {
        socket.on('message', async data => {
            const { message, correo } = data;
            messagesdb = {
                user: correo,
                message: message
            };
            totalMessages.push(data);
            let ultimoMensaje = [totalMessages[totalMessages.length - 1]];
            this.io.emit('messageLogs', ultimoMensaje);
            await messagedbManager.createMessage(messagesdb);
        });

        socket.on('authenticated', data => {
            socket.broadcast.emit('nuevoUsuario', data);
        });

    }
};