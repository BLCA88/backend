import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    };

    async addProduct({ titulo, descripcion, code, precio, status = true, stock, category, imagen = [] }) {
        //Obtiene los elementos del array del archhivo json utilizando el metodo getProducts.
        const elementos = await this.getProducts();
        const producto = {
            titulo,
            descripcion,
            code,
            precio,
            status,
            stock,
            category,
            imagen
        }

        if (elementos.length === 0) {
            producto.id = 1;
        } else {
            producto.id = elementos[elementos.length - 1].id + 1;
        }
        //CodigoExistente busca dentro de elementos y si encuentra el objeto.code igual a productos.code devuelve true
        const codigoExistente = elementos.some(p => p.code === producto.code);
        // Ciclo For que recorre las propiedades de productos, luego un condicional para evaluar si la propiedad es diferente de productos.imagen,
        // si es asi se genera otro condicional para evaluar que no haya campos undefined y otro mas que no tenga el campo codigo repetido.
        // En el caso que no se cumpla ninguno de esos dos condicionales el ultimo pushea productos a elementos y sobreescribe el archivo json bdProductos.json.
        for (const propiedad in producto) {
            if (propiedad !== producto.imagen && propiedad !== producto.status) {
                if (Object.values(producto).includes(undefined)) {
                    throw new Error("Faltan campos por completar.")
                } else if (codigoExistente) {
                    throw new Error(`Ingrese un codigo diferente ${producto.code} ya existe.`)
                } else {
                    elementos.push(producto);
                    await fs.promises.writeFile(this.path, JSON.stringify(elementos, null, '\t'));
                    return producto;
                }
            }
        }
    };

    async getProducts() {
        try {
            const archivo = await fs.promises.readFile(this.path, 'utf8');
            const productos = JSON.parse(archivo);
            return productos;
        } catch (error) {
            throw new Error(error + `Ocurrio un error al interntar leer el archivo con la ruta ${this.path}`);
        }
    };

    async getProductsById(id) {
        const arrayJson = await this.getProducts();
        const buscarId = arrayJson.find(i => i.id === id);
        if (buscarId) return buscarId;
        throw new Error(`El producto con el ID${id} no existe.`)
    };

    async deleteProductsById(id) {
        const elementos = await this.getProducts();
        const buscarIndex = elementos.findIndex(i => i.id === id);
        if (buscarIndex !== -1) {
            elementos.splice(buscarIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(elementos, null, '\t'));
            return console.log(elementos);
        } else {
            throw new Error('No existe el ID selecionado');
        }

    };

    async updateProduct(objeto, id) {
        const elementos = await this.getProducts();
        const indice = elementos.findIndex(i => i.id === id);
        const buscarID = elementos.find(i => i.id === id)
        Object.defineProperties(elementos[indice], {
            code: {
                writable: false
            },
            id: {
                writable: false
            }
        });
        const propElemen = Object.getOwnPropertyDescriptors(elementos[indice]);
        if (buscarID) {
            for (const propiedad in objeto) {
                if (elementos[indice].hasOwnProperty(propiedad) && propElemen[propiedad].writable === true) {
                    elementos[indice][propiedad] = objeto[propiedad];
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(elementos, null, '\t'));
        } else {
            throw new Error('Se presento un error al intentar actualizar los datos');
        }
    }
}

export const productManager = new ProductManager('./src/db/bdProducts.json');