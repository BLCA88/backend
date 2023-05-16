import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    };

    async addProduct({ titulo, descripcion, precio, imagen, code, stock = 50 }) {
        const productos = {
            titulo,
            descripcion,
            precio,
            imagen,
            code,
            stock: stock || 50
        }
        //Obtiene los elementos del array del archhivo json utilizando el metodo getProducts.
        const elementos = await this.getProducts();

        if (elementos.length === 0) {
            productos.id = 1;
        } else {
            productos.id = elementos[elementos.length - 1].id + 1;
        }

        //CodigoExistente busca dentro de elementos y si encuentra el objeto.code igual a productos.code devuelve true
        const codigoExistente = elementos.some(p => p.code === productos.code);
        //CampoVacio verifica dentro del objeto productos si hay un campo undefined y si es asi devuelve true.
        const campoVacio = Object.values(productos).includes(undefined);

        if (!(codigoExistente || campoVacio)) {
            elementos.push(productos);
        } else if (campoVacio) {
            console.log('Tenes que completar todos los campos para poder crear un producto');
        } else {
            console.log(`Ingrese un codigo diferente: ${productos.code} ya existe`);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(elementos, null, '\t'));
        return elementos;
    };

    async getProducts() {
        try {
            const archivo = await fs.promises.readFile(this.path, 'utf8');
            const productos = JSON.parse(archivo);
            return productos;
        } catch (error) {
            console.log(error + `Ocurrio un error al interntar leer el archivo con la ruta ${this.path}`);;
            return [];
        }
    };

    async getProductsById(id) {
        const elementos = await this.getProducts();
        const buscarId = elementos.find(i => i.id === id);
        if (buscarId) {
            return buscarId;
        } else if (buscarId === undefined) {
            console.log('No existe el producto con el ID solicitado')
            return;
        }
    };


    async deleteProductsById(id) {
        const elementos = await this.getProducts();
        const buscarIndex = elementos.findIndex(i => i.id === id);
        if (buscarIndex !== -1) {
            elementos.splice(buscarIndex, 1);
            console.log(elementos);
        } else {
            console.log('No existe el ID selecionado')
        }

        await fs.promises.writeFile(this.path, JSON.stringify(elementos, null, '\t'));

    };

    async updateProduct(objeto, id) {
        const elementos = await this.getProducts();
        const buscarIndex = elementos.findIndex(i => i.id === id);
        for (const key in objecto) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];

            }
        }
        let obm = {
            objeto,
            ...elementos[buscarIndex],
        }
        console.log(obm)


        //await fs.promises.writeFile(this.path, JSON.stringify(elementos, null, '\t'));
    };
}