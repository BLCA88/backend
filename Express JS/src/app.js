console.log("Starting")
import express from 'express';
import ProductManager from './ProductManager.js';
const app = express();


app.get('/', (req, res) => {
    res.send("Hola como estas")
});

app.listen(8080, () => console.log('Escucho gatin!'));