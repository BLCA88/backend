import { Router } from "express";
import productoModel from '../../dao/models/productos.model.js';
import { productdbManager } from "../../dao/managersMDB/productdbManager.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const producto = await productdbManager.addproduct(req.body);
        res.send(producto);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        await productoModel.deleteMany({});
        return res.status(200).json({ message: 'Se borro la coleccion correctamente.' })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const arrayObjetos = await productdbManager.getProducts();
        const productos = arrayObjetos.slice(0, limit);
        res.json(productos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const producto = await productdbManager.getProductsById(cid);
        res.json(producto);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export { router as productosbdRouter };