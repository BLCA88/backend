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