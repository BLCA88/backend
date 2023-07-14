import { productModel } from '../models/productos.model.js';

export default class ProductdbManager {

    async addproduct(producto) {
        const nuevoProducto = new productModel(producto);
        if (nuevoProducto) {
            await nuevoProducto.save();
            return nuevoProducto;
        } else {
            throw new Error({
                status: error,
                message: 'Se produjo un error al intentar crear el producto',
            });
        }
    };

    async getProducts() {
        const products = await productModel.find({});
        if (products) {
            return products;
        } else {
            throw new Error({
                status: error,
                message: 'Se produjo un error al intentar obtener el producto',
            });
        }
    };

    async getProductPaginate(query, options) {
        const paginateProducts = await productModel.paginate(query, options);
        return paginateProducts;
    }

    async getProductsById(cid) {
        const productId = await productModel.findOne({ code: cid });
        if (productId) {
            return productId;
        } else {
            throw new Error({
                status: error,
                message: 'El producto no existe.',
            });
        }
    };

    async updateProduct(id, objeto) {
        Object.keys(objeto).forEach(key => (objeto[key] === '') && delete objeto[key]);
        if (Object.keys(objeto).length === 0) {
            console.log('No hay campos para actualizar.');
            return;
        }
        const updateProduct = await productModel.findByIdAndUpdate(id, objeto, { new: true });
        if (updateProduct) {
            console.log('Se actualizo el documento correctamente', updateProduct);
        } else {
            throw new Error({
                status: error,
                message: 'Se presento un error al intentar actualizar los datos del docuemnto.',
            });
        }
    };

    async deleteById(id) {
        const deleteProduct = await productModel.deleteOne({ _id: id });
        if (deleteProduct) {
            return deleteProduct;
        } else {
            throw new Error({
                status: error,
                message: 'Se presento un error al intentar borrar el producto.',
            });
        }
    };
};

export const productdbManager = new ProductdbManager();