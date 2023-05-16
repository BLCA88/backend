console.log("Starting")
import express from 'express';
import ProductManager from './productManager.js';
const app = express();


const manager = new ProductManager('./bdProducts.json');



app.get('/products', (req, res) => {
    const buscarID = async () => {
        const objetos = await manager.getProducts();
        const mostrar = objetos;
        return mostrar;
    }
    res.send(buscarID());
});

app.listen(8080, () => console.log('Escucho loro!'));