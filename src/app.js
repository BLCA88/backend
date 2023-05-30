import express from 'express';
import { Server } from 'socket.io';
import hadlebars from 'express-handlebars';
import __dirname from './utils.js'
import { viewsRouter, productsRouter, cartRouter } from './routes/routes.js';
import { productManager } from './managers/productManager.js';

const app = express();
const server = app.listen(8080, () => console.log('Escucho loro!'));
const io = new Server(server);


//Opcion Express(Alan) para ubicar el emit en cualquier petición del archivo route.
/* app.set('io', io);
req.app.get("io").sockets.emit("productos", await productManager.getProducts()); */
//Se que no es la mejor opcion pero no queria utilizar la misma. Entiendo que en este caso se esta enviando como propiedad de express, para poder acceder por medio del metodo get a la instancia de socket io que a su vez permite acceder a las propiedades de socket.IO.
//Quiero ver la clase del martes para ver que otras opciones tengo aunque por ahora creo que la mejor es la de app.set. 
export const emitProducts = async () => {
    const productos = await productManager.getProducts()
    io.emit('productos', productos);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', hadlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

io.on('connection', async socket => {
    console.log('Nuevo Cliente Conectado');
    emitProducts();
});