// Comando para establecer la conexión
socket = io();
var label = $('#lblNuevoTicket'); //jQuery - Hace referencia a esta etiqueta del HTML 

// On es para escuchar sucesos.
socket.on('connect', function() {
    console.log('Conectado al servidor.');
});
socket.on('disconnect', function() {
    console.log('Se perdió la conexión con el servidor.');
});

$('button').on('click', function() { //jQuery - Al presionar cualquier botón:
    console.log('click');
    socket.emit('siguienteTurno', null, function(resp) {
        console.log(resp);
        label.text(resp);
    });
});

socket.on('siguienteTurnoAsignado', function(mensaje) {
    console.log(mensaje);
    label.text(mensaje);
});