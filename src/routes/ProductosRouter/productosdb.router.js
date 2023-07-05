import { Router } from "express";
import { productdbManager } from '../../dao/index.managers.js';
import { VALIDATOR_JOI } from '../../utils/joi.utils.js'
import { io } from '../../app.js'

const router = Router();

//linea 11 a 25: -> Para lo solicitado en el PP trato de obtener del req.query los parametros y creo directamente una variable options para enviar en conjunto con query el metodo Paginate al Manager.
//-> Luego una vez recibida la respuesta completo los campos en una nueva variable response asi envio al cliente la respuesta editada.
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort === 'desc' ? -1 : 1;
        const query = req.query.query ? JSON.parse(req.query.query) : {};

        const options = {
            page: page,
            limit: limit,
            sort: { precio: sort },
        };

        const productos = await productdbManager.getProductPaginate(query, options);

        const response = {
            status: 'success',
            payload: productos.docs,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage ? `/api/productsbd?page=${productos.prevPage}&limit=${limit}` : null,
            nextLink: productos.hasNextPage ? `/api/productsbd?page=${productos.nextPage}&limit=${limit}` : null,
        };

        return res.json(response);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/:pcod', async (req, res) => {
    try {
        const { cod } = req.params;
        const producto = await productdbManager.getProductsById(cod);
        res.json(producto);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// linea 58 a 68: -> Obtengo las propiedades desde el body y aplico JOI para validar los campos antes de enviarlos a la nube creo que es una forma practica y dinamica de validar los datos antes,
// -> enviarlos al servidor.
router.post('/', async (req, res) => {
    try {
        const { titulo, descripcion, code, precio, stock, category, imagen } = req.body;
        console.log(titulo, descripcion, code, precio, stock, category, imagen)
        const nwProduct = await VALIDATOR_JOI.product.validateAsync({
            titulo,
            descripcion,
            code,
            precio,
            stock,
            category,
            imagen
        });
        const producto = await productdbManager.addproduct(nwProduct);
        io.emitProducts();
        res.send(producto);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, code, precio, stock, category } = req.body;
        const updateProduct = await productdbManager.updateProduct(id, { titulo, descripcion, code, precio, stock, category });
        io.emitProducts();
        return res.send(updateProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await productdbManager.deleteById(id)
        io.emitProducts();
        return res.status(200).json({ message: `Se borro correctamente el producto con el CODIGO: ${id}` })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export { router as productosdbRouter };