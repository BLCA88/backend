const socket = io();
const productosTabla = document.getElementById('prodBody');
const botonAgregar = document.getElementById('button-addon2');
const botonModificar = document.getElementById('button-updateon2');
const botonEliminar = document.getElementById('button-deleteon2');

const url = 'http://localhost:8080/realtimeproducts';

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
        console.log(result);
    } catch (e) {
        console.log('Se produjo un error', e);
    };
};

botonAgregar.addEventListener('click', () => {
    const inputsValues = document.querySelectorAll('#inputValues');
    const objetoProducto = {};
    for (const iterator of inputsValues) {
        objetoProducto[iterator.ariaLabel] = iterator.value;
    }
    agregarProducto(url, objetoProducto)
    socket.on('productos',);

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





