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
    async getProductsById(cid) {
        try {
            const productId = await productoModel.findOne({ code: cid });
            return productId;
        } catch (error) {
            throw new Error(`Ocurrio un error al intentar obtener el producto con el ID: ${id}` + error);
        }
    };
    async deleteById(id) {
        try {
            const deleteProduct = await productoModel.deleteOne({ _id: id });
            return deleteProduct;
        } catch (error) {
            throw new Error(`Ocurrio un error al intentar borrar el prodcuto con el ID: ${id}` + error);
        }
    };
};

export const productdbManager = new ProductdbManager();