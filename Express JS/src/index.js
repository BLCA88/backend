import ProductManager from './productManager.js';

const manager = new ProductManager('../bdProducts.json');

/* const env = async () => {
    let product = {
        titulo: 'Prueba8',
        descripcion: 'blabla',
        precio: '4000',
        imagen: 'bla1',
        code: 'AR15'
    };
    let result = await manager.addProduct(product);
};

env() */

/* const buscarID = async () => {
    const id = await manager.deleteProductsById(2);
    return id;
}


buscarID() */

/* const update = async () => {
    let product = {
        "titulo": "Prueba80",
        "descripcion": "probando objet.defineproperty",
        "precio": "sentirse dios",
        "imagen": "yo bailando",
        "code": "AR5"
    };
    let result = await manager.updateProduct(product, 1);
    console.log(result);
};

update(); */

const productos = async () => {
    let result = await manager.getProductsById(1);
    return result;
}
productos();