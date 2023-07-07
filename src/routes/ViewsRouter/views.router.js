import { Router } from 'express';
import { productdbManager, cartdbManager } from '../../dao/index.managers.js';
import { io } from '../../app.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const productos = await productdbManager.getProducts();
        return res.render('home', productos);

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// linea: 36 -> Cada vez que queria obtener las propiedades de Mongo si no modificaba el dato de _id: como un dato plano me generaba error. No podia usar lean() y lo que se me ocurrio es modificar el 
//-> campo i _id: como un String. Seguramente exista alguna otra forma o metodo que aún no investigue a fondo.
// linea 42 -> Aca necesitaba traer todos los campos y crear un nuevo array solo con las categorias. Esto particularmente lo hice de esta manera por falta de tiempo pero creo que tendria que usar
//-> algún metodo de mongoose para no traer todos los productos directamente y filtrar lo que necesito.

router.get('/products', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const sort = req.query.sort === 'desc' ? -1 : 1;
        const query = req.query.query ? JSON.parse(req.query.query) : {};
        const user = req.session.user;

        const options = {
            page: page || 1,
            limit: limit || 10,
            sort: { precio: sort },
        };

        const prodPag = await productdbManager.getProductPaginate(query, options);
        const docs = prodPag.docs.map(producto => ({
            ...producto.toObject(),
            _id: producto._id.toString()
        }));

        const productos = await productdbManager.getProducts();
        const categorias = [...new Set(productos.map(c => c.category))];

        return res.render('products', {
            prodPag,
            docs,
            categorias,
            user
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

});

// linea 59: -> Obtengo el carrito con los productos y modifico el objeto con map y spread para renderizar un array con las propiedades que necesito de los productos agregados al carrito.
router.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const carrito = await cartdbManager.getById(cid);
        const productos = carrito.productos.map((objeto) => {
            const { _id, __v, ...producto } = objeto.producto;
            return {
                ...producto,
                quantity: objeto.quantity
            }
        });
        console.log(productos);
        return res.render('cart', {
            carrito,
            productos
        });
    } catch (error) {

    }
});

const session = (req, res, next) => {
    if (!req.session.user === 'admin') {
        return res.redirect('/products');
    }
    next();
};

router.get('/login', session, async (req, res) => {
    res.render('login');
});

router.get('/register', session, async (req, res) => {
    res.render('register');
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
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