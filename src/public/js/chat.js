const socket = io();

let usuario;

const inputbox = document.getElementById('message-input');
console.log(inputbox);

Swal.fire({
    title: 'Identifiquese',
    input: 'text',
    text: 'Ingresa tu nombre de usuario para ingresar en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas un nombre de usuario para ingresar al chat';
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    usuario = result.value;
    socket.emit('authenticated', usuario);
});

inputbox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        console.log(inputbox.value);
        if (inputbox.value.trim().length > 0) {
            socket.emit('message', { usuario, message: inputbox.value });
            inputbox.value = '';
        }
    }
});

socket.on('messageLogs', data => {
    console.log(data);
    let log = document.getElementById('message_log1');
    let messages = '';
    data.forEach(message => {
        messages += `${message.usuario} dice: ${message.message}`;
    })
    console.log(messages);
    log.innerHTML = messages;
});

socket.on('nuevoUsuario', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer: 3000,
        title: `${data} se a unido al chat`,
        icon: 'success'
    });
});