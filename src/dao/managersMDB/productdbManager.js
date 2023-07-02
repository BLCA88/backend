import productoModel from '../models/productos.model.js';

export default class ProductdbManager {

    async addproduct(producto) {
        const nuevoProducto = new productoModel(producto);
        try {
            await nuevoProducto.save();
            return nuevoProducto;
        } catch (error) {
            return ({
                message: 'Se produjo un error al intentar crear el producto',
                error: error.message
            });
        }
    };

    async getProducts() {
        try {
            const products = await productoModel.find({});
            return products;
        } catch (error) {
            return ({ error: error.message });
        }
    };

    async getProductPaginate(query, options) {
        const paginateProducts = await productoModel.paginate(query, options);
        return paginateProducts;
    }

    async getProductsById(cid) {
        try {
            const productId = await productoModel.findOne({ code: cid });
            return productId;
        } catch (error) {
            return ({ error: error.message });
        }
    };

    async updateProduct(id, objeto) {
        Object.keys(objeto).forEach(key => (objeto[key] === '') && delete objeto[key]);
        if (Object.keys(objeto).length === 0) {
            console.log('No hay campos para actualizar.');
            return;
        }
        const updateProduct = await productoModel.findByIdAndUpdate(id, objeto, { new: true });
        if (updateProduct) {
            console.log('Se actualizo el documento correctamente', updateProduct);
        } else {
            throw new Error('Se presento un error al intentar actualizar los datos del docuemnto.')
        }
    };

    async deleteById(id) {
        try {
            const deleteProduct = await productoModel.deleteOne({ _id: id });
            return deleteProduct;
        } catch (error) {
            return ({ error: error.message });
        }
    };
};

export const productdbManager = new ProductdbManager();