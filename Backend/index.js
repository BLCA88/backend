class ProductManager {
    constructor() {
        this._products = []
    }
    
    addProduct(titulo, descripcion, precio, imagen, code, stock = 50) {
        let productos = {
            titulo,
            descripcion,
            precio,
            imagen,
            code,
            stock: stock || 50
        }

        if(this._products.length === 0){
            productos['id'] = 1
        }else {
            productos['id'] = this._products[this._products.length - 1]['id'] + 1
        }
        
        let campoVacio = Object.values(productos).includes(undefined)
        let validar
        this._products.forEach(element => {
            validar = element.code
        })        
        
        if (validar != code) {
            if(campoVacio === false) {
                this._products.push(productos)                
            }else {
                console.log('Tenes que completar todos los campos para poder crear un producto')
            }
            
        }else {
            console.log(`Ingrese un codigo diferente: ${productos.code} ya existe`)
        }
    }    

    getProducts() {
        return this._products
    }

    getProductById(idProduct) {
        let id = this._products.find(prop => prop['id'] == idProduct)        
        if (id === undefined) {
            console.log(`El id ${idProduct} no existe`)
        }else{
            return id 
        }                
    }
}


const catalogo = new ProductManager();


catalogo.addProduct('Notebook LE', '250gbSSD, 6RAM, W11', '$120000', 'LE', 'AR01')
catalogo.addProduct('Notebook HP', '500gbSSD, 8RAM, W10', '$153000', 'HP', 'AR01', 30)
catalogo.addProduct('Notebook ASUS', '1TB, 16RAM, W10', '$190000', 'ASUS', 'AR02', 40)
catalogo.addProduct('Notebook LR', 'AR02', 10)
catalogo.addProduct('Notebook LR', '250gbSSD, 8RAM, W10', '$130000', 'HP', 'AR03', 10)
catalogo.addProduct('Notebook LR', '250gbSSD, 8RAM, W10', '$130000', 'HP', 'AR03', 10)


console.log(catalogo.getProducts())
console.log(catalogo.getProductById(3))
    


