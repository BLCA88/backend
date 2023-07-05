const socket = io();

const inputbox = document.getElementById('message-input');

//Modal para obtener el nombre de usuario y correo.
let usuario;
let correo;
Swal.fire({
    title: 'Hola!',
    input: 'text',
    text: 'Ingresa tu nombre para ingresar en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas un nombre de usuario para ingresar al chat';
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    if (result.isConfirmed) {
        usuario = result.value;
        Swal.fire({
            title: 'Un paso mas!',
            input: 'email',
            text: 'Ingresa tu correo electrónico para ingresar al chat',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                correo = result.value;
                socket.emit('authenticated', usuario);
            }
        });
    }
});

//Modal Toast
socket.on('nuevoUsuario', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'success'
    });
});


inputbox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (inputbox.value.trim().length > 0) {
            socket.emit('message', { usuario, message: inputbox.value, correo });
            inputbox.value = '';
        }
    }
});

socket.on('messageLogs', data => {
    let log = document.getElementById('messagebox');
    const templateInner = Handlebars.compile(`
    {{#each data}}
    <div class="d-flex flex-row justify-content-start mb-4">        
        <div class="p-3 ms-2" style="width: 45px; height: 100%; border-radius: 100%; background-color: #1e4d5e; color: white;">
            <span class="text-uppercase"><strong>${data[0].usuario.charAt(0)}</strong></span>
        </div>
        <div class="p-3 ms-1" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
            <p id="message_log1" class="large mb-0">{{this.message}}</p>
        </div>
    </div>    
    {{/each}}    
    `);
    const plantilla = templateInner({ data });
    log.insertAdjacentHTML('beforeend', plantilla);
    log.scrollTop = log.scrollHeight;
    //Para que los mensajes siempre se muestren en la parte inferior del contenedor ya que sin esto habia que scrollear.
});