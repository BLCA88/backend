import express from 'express';
import __dirname from './utils.js'
import displayRoutes from 'express-routemap';
import handlebars from 'express-handlebars';
import { SocketManager, connectionMongo, config } from './config/index.config.js';
import { viewsRouter, productsRouter, cartRouter, productosdbRouter, cartdbRouter } from './routes/index.routes.js';


const app = express();
const server = app.listen(config.PORT, () => {
    displayRoutes(app);
    console.log(`<||Server listening on port ${config.PORT}||>`);
    console.log('');
    connectionMongo();
});
export const io = new SocketManager(server);


//<--------<Mildwares>----------->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//<-------<Express set>--------->
app.engine('handlebars', handlebars.engine());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//<-------<Express use>--------->
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/cartdb', cartdbRouter);
app.use('/api/productsbd', productosdbRouter);
