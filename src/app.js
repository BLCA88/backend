<<<<<<< HEAD
import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRoutes from './routes/cart.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRoutes);


app.listen(8080, () => console.log('Escucho loro!'));
=======
import express from 'express';
import SocketManager from './config/socketio/socketio.config.js';
import displayRoutes from 'express-routemap';
import hadlebars from 'express-handlebars';
import __dirname from './utils.js'
import { viewsRouter, productsRouter, cartRouter, productosbdRouter } from './routes/routes.js';
import { connectionMongo } from './config/mongoatlas/mongo.config.js';

const app = express();
const server = app.listen(8080, () => {
    displayRoutes(app);
    console.log('<||Server listening on port 8080||>');
    console.log('');
});
export const io = new SocketManager(server);
connectionMongo();

//<-------<Mildwares>--------->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', hadlebars.engine());

//<-------<Express set>--------->
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/productsbd', productosbdRouter);
>>>>>>> 208e4fcb9d0d46218156f4a06009327b2661d7a3
