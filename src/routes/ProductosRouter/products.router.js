import { Router } from "express";
import { productManager } from '../../managers/productManager.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const arrayObjetos = await productManager.getProducts();
        const productos = arrayObjetos.slice(0, limit);
        return res.send(productos);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = await productManager.getProductsById(parseInt(id));
        return res.send(productoId);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const nuevoProducto = await productManager.addProduct(data);
        return res.send(nuevoProducto);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, code, precio, status, stock, category, imagen } = req.body;
        const updateProducto = await productManager.updateProduct({ titulo, descripcion, code, precio, status, stock, category, imagen }, parseInt(id))
        return res.send(updateProducto);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productManager.deleteProductsById(parseInt(id));
        return res.send({ mensaje: `El producto con el ID: ${id} se borro correctamente.` });
    } catch (err) {
        return res.status(400).json({ error: err.message });;
    }
});

export { router as productsRouter };
