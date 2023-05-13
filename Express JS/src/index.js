import ProductManager from './product-manager.js';

const generador = new ProductManager('../bdProducts.json');

const env = async () => {
    let product = {
        titulo: 'Prueba5',
        descripcion: 'blabla',
        precio: '4000',
        imagen: 'bla1',
        code: 'AR3'
    };
    let result = await generador.addProduct(product);
    console.log(result);
};

env()