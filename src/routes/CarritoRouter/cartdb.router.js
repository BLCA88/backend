import { Router } from "express";
import { cartdbManager } from "../../dao/index.managers.js";
import { io } from '../../app.js'

const router = Router();

router.post('/', async (req, res) => {
    const producto = req.body
    try {
        const nwCart = await cartdbManager.newCart(producto);
        return res.send(nwCart);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const fullCart = await cartdbManager.getById(cid)
        return res.send(fullCart);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

router.put('/:cid/productsdb/:pid', async (req, res) => {
    try {
        const elementos = req.body
        const updateCart = await cartdbManager.updateCart(elementos);
        return res.send(updateCart);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

router.delete('/:cid/productsdb/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const objeto = {
            _id: cid,
            producto: pid
        };
        const deleteProduct = await cartdbManager.deleteProductCart(objeto);
        return res.send(deleteProduct);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const deleteProducts = await cartdbManager.deleteProductsCart(cid);
        return res.send(deleteProducts);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

export { router as cartdbRouter };