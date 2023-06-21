import { Server } from 'socket.io';
import { productManager } from '../../dao/managersFS/productManager.js';

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
        socket.on('disconnect', async socket => {
            console.log('Cliente desconectado.')
        });

    };
    async emitProducts() {
        const productos = await productManager.getProducts();
        this.io.emit('productos', productos);
    };

    async onChat(socket) {
        const messages = [];
        socket.on('message', data => {
            messages.push(data);
            let ultimoMensaje = [messages[messages.length - 1]];
            this.io.emit('messageLogs', ultimoMensaje);
        });

        socket.on('authenticated', data => {
            socket.broadcast.emit('nuevoUsuario', data);
        });
    }
};