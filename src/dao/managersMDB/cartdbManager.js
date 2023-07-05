import { carritoModel } from "../models/carrito.model.js";

export default class CartdbManager {

    async newCart(objeto) {
        const nuevoCarrito = new carritoModel({ productos: [objeto] });
        await nuevoCarrito.save();
        if (!nuevoCarrito) {
            throw new Error({
                status: error,
                message: 'Se produjo un error al intentar crear el carrito',
            });
        } else {
            return nuevoCarrito;
        }
    };

    async getCart() {

    };

    async getById(id) {
        const cart = await carritoModel.findById(id).populate('productos.producto').lean();
        return cart
    };

    async updateCart(objeto) {
        const carrito = await carritoModel.findById(objeto._id);
        if (!carrito) {
            throw new Error({
                status: error,
                message: 'El carrito no existe',
            });
        }
        const productoExistente = carrito.productos.find(p => p.producto.equals(objeto.producto));

        if (productoExistente) {
            productoExistente.quantity = objeto.quantity;
        } else {
            delete objeto._id;
            carrito.productos.push(objeto);
        }
        const updatedCarrito = await carrito.save();
        return updatedCarrito
    }

    async deleteProductCart(objeto) {
        const carrito = await carritoModel.findById(objeto._id);
        if (!carrito) {
            return ({ status: '400', message: 'El carrito no existe' });
        } else {
            carrito.productos = carrito.productos.filter(propiedad => propiedad.producto.toString() !== objeto.producto)
            await carrito.save();
            return ({ status: '200', message: 'Se elimino el producto del carrito correctamente' });
        }
    }

    async deleteProductsCart(idCarrito) {
        const carrito = await carritoModel.findById(idCarrito);
        if (!carrito) {
            return ({ status: '400', message: 'El carrito no existe' });
        } else {
            carrito.productos = [];
            await carrito.save();
            return ({ status: '200', message: 'Se eliminaron los productos del carrito correctamente' });
        }
    }
};

export const cartdbManager = new CartdbManager();