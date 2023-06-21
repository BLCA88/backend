import { Router } from 'express';
import { productManager } from '../../dao/managersFS/productManager.js';
import { io } from '../../app.js'

const router = Router();

router.get('/', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        return res.render('home', {
            productos
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        return res.render('realTimeProducts', {
            productos
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post('/realtimeproducts', async (req, res) => {
    try {
        const data = req.body;
        await productManager.addProduct(data);
        io.emitProducts();
        return res.send({ mensaje: 'success' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get('/chat', async (req, res) => {
    try {
        return res.render('chat');
    } catch (error) {
        return res.status(400).json({ error: err.message });
    }
});
export { router as viewsRouter };