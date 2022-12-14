const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path        
        if (fs.existsSync(path)) {            
            this._products = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        } else {
            this._products = []
        }        
    }

    async addProduct({titulo, descripcion, precio, imagen, code, stock = 50}) {
        const productos = {
            titulo,
            descripcion,
            precio,
            imagen,
            code,
            stock: stock || 50
        }
        

        if (this._products.length === 0) {
            productos['id'] = 1
        } else {
            productos['id'] = this._products[this._products.length - 1]['id'] + 1
        }

        let campoVacio = Object.values(productos).includes(undefined)
        let validar
        this._products.forEach(element => {
            validar = element.code
        })
        
        if (validar != code) {
            if (campoVacio === false) {
                this._products.push(productos)     
            } else {
                console.log('Tenes que completar todos los campos para poder crear un producto')
            }

        } else {
            console.log(`Ingrese un codigo diferente: ${productos.code} ya existe`)
        }

        await fs.promises.writeFile(this.path, JSON.stringify(this._products, null, '\t'))
    }

    getProducts() {
        const consulta = async () => {
            return JSON.parse(await fs.promises.readFile(this.path))
        }          
        return consulta().then(productos => console.log(productos))                   
    }   
    
    async getProductById(productID) {      
        const consulta = async () => {
            return JSON.parse(await fs.promises.readFile(this.path))
        }        
        let validar = await consulta().then(elementos => elementos.filter(e => e.id === productID))
        if (validar[0] === undefined){
            console.log(`el id ${productID} no existe`)
        }else {
            console.log(validar[0])
        }
    }
    deleteProductById(productID) {
        let consulta = this._products.find(product => product.id === productID)
        if (consulta.id === productID){
            let index = this._products.findIndex(element => element.id === productID)
            this._products.splice(index, 1)
            console.log(` ${productID} eliminado`)
            console.log(this._products)
            
        }            
        else{
            console.log('el ID no existe')           
        }
        
        
    }

        
}


const catalogo = new ProductManager('./bdProductos.json')
const consultaProductos = []



catalogo.addProduct({
    titulo: 'Prueba2',
    descripcion: 'blabla',
    precio: '4000',
    imagen: 'bla1',
    code: 'AR1'
})
catalogo.addProduct({
    titulo: 'Prueba2',
    descripcion: 'blabla',
    precio: '4000',
    imagen: 'bla1',
    code: 'AR2'
})
catalogo.addProduct({
    titulo: 'Prueba2',
    descripcion: 'blabla',
    precio: '4000',
    imagen: 'bla1',
    code: 'AR3'
})




//console.log(catalogo.getProductById())
//catalogo.getProducts().then(productos => console.log(productos))
 
//catalogo.getProducts()
//catalogo.getProductById(1)
catalogo.deleteProductById(2)