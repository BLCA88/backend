import express from 'express';
import ProductManager from './productManager.js';
const app = express();


const manager = new ProductManager('./bdProducts.json');

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.send();
});

app.get('/products', async (req, res) => {
    const objetos = await manager.getProducts();
    res.send(objetos);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const objeto = await manager.getProductsById(parseInt(id));
    if (objeto) return res.send(objeto);
    res.send('{El ID no existe}');
});

app.get('/search', async (req, res) => {
    const { limit } = req.query;
    const arrayObjetos = await manager.getProducts();
    const elementos = arrayObjetos.slice(0, limit);
    if (elementos) return res.send(elementos);
    res.sendStatus(404)
});

app.listen(8080, () => console.log('Escucho loro!'));