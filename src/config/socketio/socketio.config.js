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
        });
        this.io.on('disconnect', async socket => {
            console.log('Cliente desconectado.')
        });
    };

    async emitProducts() {
        const productos = await productManager.getProducts();
        this.io.emit('productos', productos);
    };
};