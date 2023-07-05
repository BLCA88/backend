//La variable <idCarrito> la uso para guardar el "_id" del carrito para poder agregar el producto (si existe el carrito) en vez de ir creando mas carritos.
let idCarrito = '';
async function agregarCarrito(objeto) {
    try {
        const url = 'http://localhost:8080/api/cartdb'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto),
        });
        const result = await response.json();
        idCarrito = result._id;
    } catch (err) {
        console.log('Se produjo un error', err);
    };
};

async function actualizarCarrito(carrito, objeto) {
    try {
        objeto._id = carrito;
        const url = `http://localhost:8080/api/cartdb/${carrito}/productsdb/${objeto.producto}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto)
        });
        const result = await response.json();
        console.log('Se agrego el producto correctamente al carrito:', result);
    } catch (err) {
        console.log('Se produjo un error', err);
    }
};

//Obtengo los botones de cada fila para poder crear/agregar los productos al carrito.
const buttonsProd = document.querySelectorAll('#buttonCart');

//Cada vez que realizo el click sobre el botón me traigo el valor de cantidad y el valor del id del producto para enviarlo por HTTP request.
buttonsProd.forEach((button) => {
    button.addEventListener('click', () => {
        const inputCant = button.parentNode.parentNode.querySelector('.inputCant');
        const etiqId = button.parentNode.parentNode.querySelector('#id');
        const producto = {
            producto: etiqId.textContent,
            quantity: parseInt(inputCant.value)
        }
        if (idCarrito === '') {
            agregarCarrito(producto);
        } else {
            actualizarCarrito(idCarrito, producto);
        }
        Swal.fire({
            icon: 'success',
            title: 'Agregaste un producto al Carrito',
        })
    });
});

//Obtengo el botón para eschucar el evento click y asi enviar al cliente al carrito con los productos seleccionados.
const btnViewCart = document.getElementById('btnViewCart');
btnViewCart.addEventListener('click', () => {
    if (idCarrito !== '') {
        const path = `http://localhost:8080/carts/${idCarrito}`
        window.location.href = path;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Aún no agregaste productos al carrito.',
        })
    }
});
