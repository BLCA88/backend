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

connectionMongo();

export const io = new SocketManager(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', hadlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/productsbd', productosbdRouter);