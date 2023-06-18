import { Router } from 'express';
import cartManager from '../../dao/managersFS/cartManager.js';

const router = Router();


router.post('/', async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.nuevoCarrito();
        return res.send(nuevoCarrito);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const productosId = await cartManager.getCarritoById(parseInt(cid))
        return res.send(productosId);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const modificarCarrito = await cartManager.agregarCarrito(parseInt(cid), parseInt(pid));
        return res.send(modificarCarrito);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    };
});


export { router as cartRouter };