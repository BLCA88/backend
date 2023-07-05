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
        const url = `http://localhost:8080/api/productsbd/${id}`;
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
        const url = `http://localhost:8080/api/productsbd/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

    } catch (e) {
        console.log('Se produjo un error', e);
    }
}

botonAgregar.addEventListener('click', () => {
    const inputsValues = document.querySelectorAll('#inputValues');
    //console.log(inputsValues)
    const objetoProducto = {};
    for (const iterator of inputsValues) {
        console.log(iterator)
        objetoProducto[iterator.placeholder] = iterator.value;
        console.log(objetoProducto);
    }
    const url = 'http://localhost:8080/api/productsbd';
    agregarProducto(url, objetoProducto)
    socket.on('productos', (productos) => {
        console.log('Pagina Actualizada')
    });

});
botonModificar.addEventListener('click', () => {
    const inputsValuesU = document.querySelectorAll('#inputValuesU');
    const inputId = document.getElementById('inputId');
    const itemProduct = {};
    //const id = inputId.valueAsNumber;
    for (const iterator of inputsValuesU) {
        itemProduct[iterator.placeholder] = iterator.value;
    }
    updateProduct(itemProduct, inputId.value)
    socket.on('productos', (productos) => {
        console.log('Pagina Actualizada')
    });
});

botonEliminar.addEventListener('click', () => {
    const inputValueD = document.getElementById('inputValueD');
    deleteProduct(inputValueD.value);
    socket.on('productos', (productos) => {
        console.log('Pagina Actualizada')
    });
});


socket.on("productos", productos => {
    const templateInner = Handlebars.compile(`
    {{#each productos}}
    <tr>        
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
    //<th scope="row">{{this.code}}</th> ----> Campo ID al comienzo
    const plantilla = templateInner({ productos });
    productosTabla.innerHTML = plantilla;
});