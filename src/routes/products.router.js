import { Router } from "express";
import ProductManager from '../productManager.js';

const router = Router();
const manager = new ProductManager('./bdProducts.json');

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const arrayObjetos = await manager.getProducts();
        const productos = arrayObjetos.slice(0, limit);
        return res.send(productos);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = await manager.getProductsById(parseInt(id));
        return res.send(productoId);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { titulo, descripcion, code, precio, status, stock, category, imagen } = req.body;
        const propiedades = { titulo, descripcion, code, precio, status, stock, category, imagen };
        const nuevoProducto = await manager.addProduct(propiedades);
        return res.send(nuevoProducto);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, code, precio, status, stock, category, imagen } = req.body;
        const updateProducto = await manager.updateProduct({ titulo, descripcion, code, precio, status, stock, category, imagen }, parseInt(id))
        return res.send(updateProducto);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await manager.deleteProductsById(parseInt(id));
        return res.send({ mensaje: `El producto con el ID: ${id} se borro correctamente.` });
    } catch (err) {
        return res.status(400).json({ error: err.message });;
    }
});

export default router;
