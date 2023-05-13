import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    };

    async addProduct(productos) {
        const elementos = await this.getProduct();
        if (elementos.length === 0) {
            productos.id = 1;
        } else {
            productos.id = elementos[elementos.length - 1].id + 1;
        }
        elementos.push(productos);
        await fs.promises.writeFile(this.path, JSON.stringify(elementos, null, '\t'));
        return elementos;
    };

    async getProduct() {
        try {
            const archivo = await fs.promises.readFile(this.path, 'utf8');
            const productos = JSON.parse(archivo);
            return productos;
        } catch (error) {
            return [];
        }
    };

}