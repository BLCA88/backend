Proyecto Backend - Segunda Entrega del proyecto.
===========
# Estructura
 - src
   - config/ <-- Carpeta donde están las configuraciones de **Mongo Atlas** y **socketIO**.
        - mongoatlas/ 
        - socketio/
        - index.config.js
   - dao/ <-- Carpeta con los managers y los models de **Mongoose**.
        - managersFS/
        - managersMDB/
        - models/
        - index.managers.js
   - db/ <-- Carpeta con archivos **JSON** utilizados con el **FS** al principio. 
        - bdCart.json
        - bdProducts.json
   - public/ <-- Carpeta con archivos Public para el cliente.
        - css/
        - js/
   - routes/ <-- Carpeta con las routes del proyecto.
        - CarritoRouter/
        - ProductosRouter/
        - ViewsRouter/
        - index.router.js
   - utils/ <-- Carpeta con implementación de JOI para validación de archivos.
        - joi.utils.js
   - views/ <-- Carpeta con las vistas de **Handlebars**.
        - layouts/
        - views
   - app.js
   - utils.js 
 - .env
 - .env.example
 - .gitignore
 - nodemon.json
 - package-lock.json
 - package.json
 - README.md
---
 # Dependecias
`cross-env: 7.0.3` - `dotenv: 16.3.1` - `express: 4.18.2` - `express-handlebars: 7.0.7` - `express-routemap: 1.6.0` - `joi: 17.9.2` - `mongoose: 7.3.0` - `mongoose-paginate-v2: 1.7.1` - `nodemon: 2.0.22` - `socket.io: 4.6.1`

---
# Manipulación de datos
> Se crearon los archivos cartdbManager y productdbManager que se encargan de organizar los métodos, utilizando la dependencia **Mongoose** para crear los models y realizar un CRUD.
```
- dao/
    - managersFS/ <-- No se trabajó en el **FS**
    - managersMDB/
        - cartdbManajer.js
        - messagesdbManajer.js <- No se trabajó en este archivo.
        - productdbManajer.js
    - models/
        - carrito.model.js
        - messages.model.js
        - productos.model.js
    - index.managers.js <-- Se creo índice para importar los ***Managers***
```
---
## cartdbManager.js  

Métodos         | Comentarios | Archivos que lo utilizan
------          | ------      | ------   
***newCart(objeto)*** | Con este método, se crea el carrito y se inserta en el array de productos el objeto que recibe. | cartdb.router.js
***getById(id)***     | Con este método, se obtiene el carrito utilizando el ID del mismo y con el método ***populate()*** se traen los *productos* referenciados por el ID. Además se agrega el método ***lean()*** para obtener los datos sin los métodos de MongoDB (generan errores con **Handlebars**). | cartdb.router.js - views.router.js
***updateCart(objeto)*** | Con este método, se actualiza el carrito creado enviando un objeto del producto nuevo dentro del carrito específicamente al array productos. Con el método ***equals()*** se realizó la comparación del campo _id (Types.ObjectId()) de cada campo _id para poder verificar si existe el producto. Si existe se modifica la propiedad quality, si no existe se elimina el campo _id del objeto para que no se generen errores al crear el producto en el carrito y se pushea el producto. | cartdb.router.js
***deleteProductCart(objeto)*** | Con este método, se elimina un producto del carrito. Se realiza la búsqueda del carrito y se realiza un filter comparando el ID del producto del carrito con el ID del objeto recibido. Si es diferente, se guarda en el carrito y se pushea al servidor. | cartdb.router.js
***deleteProductsCart(idCart)*** | Con este método, se eliminan todos los productos del carrito. | cartdb.router.js

## productdbManager.js

Métodos         | Comentarios | Archivos que lo utilizan
------          | ------      | ------   
***addProduct(producto)*** | Con este método, se recibe el objeto para crear un producto nuevo y pushearlo al servidor. | productsbd.router.js
***getProducts()*** | Con este método, se consulta los documentos de la DB creados en la colección Productos. | productsbd.router.js - views.router.js
***getProductsPaginate(query, options)*** | Con este método se utiliza el método ***paginate()*** en el cual recibe en el caso de necesitarlo una query y un grupo de opciones que pueden ser (page, limit y sort). | productsbd.router.js - views.router.js
***getProductsById(id)*** | Con este método, se recibe un ID para buscar el documento asociado. | productsbd.router.js
***updateProduct(id, objeto)*** |   Con este método, se recibe un ID y un objeto. Con el objeto se verifica los campos que estén vacíos y se eliminan dejando solo los campos con datos. Una vez realizado el filtro, se envía el id y el objeto para actualizar el documento en el servidor. | productsbd.router.js
***deletById(id)*** | Con este método, se elimina un producto de la DB por medio del ID del documento. | productsbd.router.js

# Requerimientos
1. Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional).
    * limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
    * page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1.
    * query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general.
    * sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento.
2.  El método GET deberá devolver un objeto con el siguiente formato:
```
{
	status:success/error
    payload: Resultado de los productos solicitados
    totalPages: Total de páginas
    prevPage: Página anterior
    nextPage: Página siguiente
    page: Página actual
    hasPrevPage: Indicador para saber si la página previa existe
    hasNextPage: Indicador para saber si la página siguiente existe.
    prevLink: Link directo a la página previa (null si hasPrevPage=false)
    nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}
```
- Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.

3. Además, agregar al router de carts los siguientes endpoints:
    * DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
    * PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    * PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    * DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
    * Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.

4. Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
    - Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
    - Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

- Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito.

# Ejecución del TP

> Se modificó el metodo **FS (File System)**  por el de **Mongo Atlas**

## Persistencia de datos.
```
- routes/
    - ProductosRouter/
        - productosbd.router.js <-- Archivo creado para manipular las peticiones por el cliente en el archivo src/public/js/realtimeproducts.js
    - ViewsRouter/
        - views.router.js <-- La vista */realtimeproducts* renderiza prodcutos por el metodo getProducts() especificado en la tabla mas arriba.
```
Se modifico la persistencia de datos con **Mongoose** utilizando el archivo nuevo ***productosdb.router.js***. La ruta */realtimeproducts'* obtiene los archivos de la DB Mongo Atlas y por medio de Inputs se puede manipular la creación de nuevos documentos en la colleccion **Productos**.
```
router.get('/realtimeproducts', async (req, res) => {
    try {
        const productos = await productdbManager.getProducts();
        return res.render('realTimeProducts', {
            productos
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
```

## Endpoints productos
```
- routes/
    - ProductosRouter/
        productosbd.router.js
```
Para lo solicitado en el punto 1 y 2 de la entrega, en el archivo **productosbd.router.js** se realizó la request por la ruta */api/productsbd* y se llamó al método **getProductsPaginate()** para luego realizar por medio de un destructuring la respuesta solicitada en el trabajo practico.

```
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort === 'desc' ? -1 : 1;
        const query = req.query.query ? JSON.parse(req.query.query) : {};

        const options = {
            page: page,
            limit: limit,
            sort: { precio: sort },
        };

        const productos = await productdbManager.getProductPaginate(query, options);

        const response = {
            status: 'success',
            payload: productos.docs,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage ? `/api/productsbd?page=${productos.prevPage}&limit=${limit}` : null,
            nextLink: productos.hasNextPage ? `/api/productsbd?page=${productos.nextPage}&limit=${limit}` : null,
        };

        return res.json(response);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});
```

## Endpoints Carrito
```
- routes/
    - CarritoRouter/
        cartdb.router.js <-- Archivo nuevo.
```
Para el punto e cree el archivo **cartdb.router.js** y modifique la persistencia datos en el archivo **cartdbManager.js**. Dentro del archivo cree los endpoints solicitados para la entrega:
* DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
```
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const deleteProducts = await cartdbManager.deleteProductsCart(cid);
        return res.send(deleteProducts);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});
```
* PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
* PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
>Para los métodos PUT solicitados, cree directamente un solo endpoint que verifica por medio del ObjectId del producto creado en el carrito si este existe. Si no existe lo crea y si existe solo modifica la propiedad quantity.

```
router.put('/:cid/productsdb/:pid', async (req, res) => {
    try {
        const elementos = req.body
        const updateCart = await cartdbManager.updateCart(elementos);
        return res.send(updateCart);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});
```
* DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
```
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const deleteProducts = await cartdbManager.deleteProductsCart(cid);
        return res.send(deleteProducts);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});
```
* Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
```
router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const fullCart = await cartdbManager.getById(cid)
        return res.send(fullCart);
    } catch (error) {
        return res.status(500).json({ status: 'error', error: error.message });
    }
});
```
## Views /products

Para el último punto cree la vista */products* con la vista de los productos existentes. Por medio del método **Paginate()** y  **Handlebars** muestro la vista a la cual agregue un botón de agregar al carrito. También agregue 4 botones 2 son ver las paginas siguientes y anteriores que están limitados a 10 productos por página, otro botón es un dropdown para filtrar los productos por categoría y el ultimo dirige a la vista */cards/:cid* para mostrar el carrito creado por el cliente con sus respectivos productos. La vista */cards/:cid* genera una petición con el método **populate()** del cual se obtiene el carrito con las referencias de los productos. 

```
router.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const sort = req.query.sort === 'desc' ? -1 : 1;
        const query = req.query.query ? JSON.parse(req.query.query) : {};

        const options = {
            page: page || 1,
            limit: limit || 10,
            sort: { precio: sort },
        };

        const prodPag = await productdbManager.getProductPaginate(query, options);
        const docs = prodPag.docs.map(producto => ({
            ...producto.toObject(),
            _id: producto._id.toString()
        }));

        const productos = await productdbManager.getProducts();
        const categorias = [...new Set(productos.map(c => c.category))];
        return res.render('products', {
            prodPag,
            docs,
            categorias
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

});
```

```
router.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const carrito = await cartdbManager.getById(cid);
        const productos = carrito.productos.map((objeto) => {
            const { _id, __v, ...producto } = objeto.producto;
            return {
                ...producto,
                quantity: objeto.quantity
            }
        });
        console.log(productos);
        return res.render('cart', {
            carrito,
            productos
        });
    } catch (error) {

    }
});
```