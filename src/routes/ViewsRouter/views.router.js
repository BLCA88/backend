import { Router } from 'express';
import { productdbManager } from '../../dao/index.managers.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const productos = await productdbManager.getProducts();
        return res.render('home', {
            productos
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const productos = await productdbManager.getProducts();
        return res.render('realTimeProducts', {
            productos
        });
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