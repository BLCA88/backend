import { Server } from 'socket.io';
import { productManager } from '../../dao/managersFS/productManager.js';

export default class SocketManager {
    constructor(server) {
        this.io = new Server(server);
        this.initialized();
    }

    async initialized() {
        this.io.on('connection', async socket => {
            const clientId = socket.id;
            console.log('============================================================');
            console.log(`Nuevo usuario conectado: ClienteID-${clientId}`);
            console.log('============================================================');
            this.emitProducts();
            //this.onChat(socket);
            const messages = [];
            socket.on('message', data => {
                messages.push(data);
                this.io.emit('messageLogs', messages);
            });
            socket.on('authenticated', data => {
                socket.emit('messageLogs', messages);
                socket.broadcast.emit('nuevoUsuario', data);
            });
        });
        this.io.on('disconnect', async socket => {
            console.log('Cliente desconectado.')
        });
    };

    async emitProducts() {
        const productos = await productManager.getProducts();
        this.io.emit('productos', productos);
    };

    async onChat(socket) {
        console.log('Manejando eventos de chat');
        console.log(socket);
        /* const messages = [];
        socket.on('message', data => {
            messages.push(data);
            this.io.emit('messageLogs', messages);
        });
        console.log(messages);
        socket.on('authenticated', data => {
            this.io.emit('messageLogs', messages);
            this.io.broadcast.emit('nuevoUsuario', data);
        }); */
    }
};