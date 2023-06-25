import fs from 'fs';
import ProductManager from './productManager.js';

const manager = new ProductManager('./bdProducts.json');
export default class CartManager {
    constructor(path) {
        this.path = path;
    };

    async nuevoCarrito() {
        const elementosCarrito = [];
        const propiedadesCarrito = {
            "id": 1,
            "productos": []
        };
        try {
            const arrayCarrito = await this.getCarrito();
            propiedadesCarrito.id = arrayCarrito[arrayCarrito.length - 1].id + 1;
            propiedadesCarrito.productos = [];
            arrayCarrito.push(propiedadesCarrito);
            await fs.promises.writeFile(this.path, JSON.stringify(arrayCarrito, null, '\t'));
            return arrayCarrito;
        } catch (e) {
            if (elementosCarrito.length === 0) {
                elementosCarrito.push(propiedadesCarrito);
                await fs.promises.writeFile(this.path, JSON.stringify(elementosCarrito, null, '\t'));
                return elementosCarrito;
            }
        }
    };

    async getCarrito() {
        try {
            const archivo = await fs.promises.readFile(this.path, 'utf8');
            const carritoJson = JSON.parse(archivo);
            return carritoJson;
        } catch (error) {
            throw new Error(error + `Ocurrio un error al interntar leer el archivo con la ruta ${this.path}`);
        }
    }

    async getCarritoById(id) {
        const arrayJson = await this.getCarrito();
        const idCarrito = arrayJson.find(i => i.id === id);
        if (idCarrito) {
            return idCarrito;
        } else {
            throw new Error(`El carrito con el ID${id} no existe.`)
        }
    }

    async agregarCarrito(cid, pid) {
        const idProducto = await manager.getProductsById(pid);
        const carrito = await this.getCarrito();
        const indice = carrito.findIndex(i => i.id === cid);
        const validarId = carrito[indice].productos.some(propiedades => propiedades.id === pid);
        const objetoProductos = {
            "id": pid,
            "quantity": 1
        }
        if (idProducto && indice !== -1) {
            if (carrito[indice].productos.length === 0 || validarId === false) {
                carrito[indice].productos.push(objetoProductos);
                console.log(carrito[indice].productos);
            } else {
                for (const iterator of carrito[indice].productos) {
                    if (iterator.id === pid) {
                        iterator.quantity += 1;
                    }
                }
            }
        } else {
            throw new Error('Se presento un error al intentar actualizar los datos');
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, '\t'));
        return carrito;
    }
}
