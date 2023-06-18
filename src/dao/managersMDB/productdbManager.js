import productoModel from '../models/productos.model.js';

export default class ProductdbManager {
    async getProducts() {
        try {
            const products = await productoModel.find({});
            return products;
        } catch (error) {
            throw new Error(`Ocurrio un error al intentar obtener la información de la db` + error);
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