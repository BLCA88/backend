const socket = io();

let usuario;

const inputbox = document.getElementById('message-input');
let correo;
Swal.fire({
    title: 'Hola!',
    input: 'text',
    text: 'Ingresa tu nombre y email para ingresar en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas un nombre de usuario para ingresar al chat';
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    if (result.isConfirmed) {
        usuario = result.value;
        Swal.fire({
            title: 'Hola!',
            input: 'email',
            text: 'Ingresa tu correo electrónico para ingresar al chat',
            inputValidator: (value) => {
                return !value && 'Necesitas un correo electrónico para ingresar al chat';
            },
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
});

/* <div  class="d-flex flex-row justify-content-end mb-4">
    <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb;">            
        <p id="message-log1" class="small mb-0">{{this.usuario}}: {{this.message}}</p>
    </div>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
        alt="avatar 1" style="width: 45px; height: 100%;">
     <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar 1" style="width: 45px; height: 100%;">   
</div> */

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