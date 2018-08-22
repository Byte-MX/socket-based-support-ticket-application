// Comando para establecer la conexión
var socket = io();

// On es para escuchar sucesos.
socket.on('connect', function() {
    console.log('Conectado al servidor.');
});
socket.on('disconnect', function() {
    console.log('Se perdió la conexión con el servidor.');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('No se proporcionó un número de ventanilla');
}
var ventanilla = searchParams.get('escritorio');
var label = $('small'); // jQuery - Busca al elemento small para trabajar con él.
console.log(ventanilla);
$('h1').text('Ventanilla ' + ventanilla); // jQuery - modifica el objeto h1
$('button').on('click', function() {
    socket.emit('atenderTurno', { ventanilla: ventanilla }, function(resp) {
        console.log(resp);
        if (resp === 'No hay turnos pendientes') {
            alert(resp);
            label.text(resp);
            return;
        } else {
            label.text('Turno ' + resp.numero);
        }
    });
});