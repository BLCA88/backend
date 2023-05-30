const socket = io();
const productosTabla = document.getElementById('prodBody');
const botonAgregar = document.getElementById('button-addon2');
const botonModificar = document.getElementById('button-updateon2');
const botonEliminar = document.getElementById('button-deleteon2');


async function agregarProducto(url, objeto) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto),
        });
        const result = await response.json();
    } catch (e) {
        console.log('Se produjo un error', e);
    };
};

async function updateProduct(itemProduct, id) {
    try {
        const url = `http://localhost:8080/api/products/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemProduct),
        });
    } catch (e) {
        console.log('Se produjo un error', e);
    };
}
async function deleteProduct(id) {
    try {
        const url = `http://localhost:8080/api/products/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

    } catch (e) {
        console.log('Se produjo un error', e);
    }
}

botonAgregar.addEventListener('click', () => {
    const inputsValues = document.querySelectorAll('#inputValues');
    const objetoProducto = {};
    for (const iterator of inputsValues) {
        objetoProducto[iterator.ariaLabel] = iterator.value;
    }
    const url = 'http://localhost:8080/realtimeproducts';
    agregarProducto(url, objetoProducto)
    socket.on('productos', (productos) => {
        console.log('Pagina Actualizada')
    });

});
botonModificar.addEventListener('click', () => {
    const inputsValuesU = document.querySelectorAll('#inputValuesU');
    const inputId = document.getElementById('inputId');
    const itemProduct = {};
    const id = inputId.valueAsNumber;
    for (const iterator of inputsValuesU) {
        itemProduct[iterator.ariaLabel] = iterator.value;
    }
    updateProduct(itemProduct, id)
    socket.on('productos', (productos) => {
        console.log('Pagina Actualizada')
    });
});

botonEliminar.addEventListener('click', () => {
    const inputValueD = document.getElementById('inputValueD');
    const id = inputValueD.valueAsNumber;
    deleteProduct(id);
    socket.on('productos', (productos) => {
        console.log('Pagina Actualizada')
    });
});


socket.on("productos", productos => {
    const templateInner = Handlebars.compile(`
    {{#each productos}}
    <tr>
        <th scope="row">{{this.id}}</th>
        <td>{{this.titulo}}</td>
        <td>{{this.descripcion}}</td>
        <td>{{this.code}}</td>
        <td>$ {{this.precio}}</td>
        <td>{{this.stock}}</td>
        <td>{{this.status}}</td>
        <td>{{this.category}}</td>
        <td>{{this.imagen}}</td>
    </tr>    
    {{/each}}
    `);
    const plantilla = templateInner({ productos });
    productosTabla.innerHTML = plantilla;
});





