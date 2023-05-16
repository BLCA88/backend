import ProductManager from './product-manager.js';

const generador = new ProductManager('../bdProducts.json');

/* const env = async () => {
    let product = {
        titulo: 'Prueba6',
        descripcion: 'blabla',
        precio: '4000',
        imagen: 'bla1',
        code: 'AR12'
    };
    let result = await generador.addProduct(product);
    console.log(result);
};

env() */

/* const buscarID = async () => {
    const id = await generador.deleteProductsById(2);
    return id;
}


buscarID() */

const update = async () => {
    let product = {
        id: '',
        titulo: 'Prueba6',
        descripcion: 'blabla',
        precio: '4000',
        imagen: 'bla1',
        code: 'AR12'
    };
    let result = await generador.updateProduct(product, 1);
    console.log(result);
};

update();