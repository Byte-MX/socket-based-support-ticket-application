// Comando para establecer la conexión
var socket = io();

var lblTicket1 = $('#lblTicket1'); // jQuery - Obtiene del HTML la etiqueta con ese nombre.
var lblTicket2 = $('#lblTicket2'); // jQuery - Obtiene del HTML la etiqueta con ese nombre.
var lblTicket3 = $('#lblTicket3'); // jQuery - Obtiene del HTML la etiqueta con ese nombre.
var lblTicket4 = $('#lblTicket4'); // jQuery - Obtiene del HTML la etiqueta con ese nombre.
var lblEscritorio1 = $('#lblEscritorio1'); // jQuery - Obtiene del HTML la etiqueta con ese nombre.
var lblEscritorio2 = $('#lblEscritorio2'); // jQuery - Obtiene del HTML la etiqueta con ese nombre.
var lblEscritorio3 = $('#lblEscritorio3'); // jQuery - Obtiene del HTML la etiqueta con ese nombre.
var lblEscritorio4 = $('#lblEscritorio4'); // jQuery - Obtiene del HTML la etiqueta con ese nombre.

var lblTurnos = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblVentanillas = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// On es para escuchar sucesos.
socket.on('connect', function() {
    console.log('Conectado al servidor.');
});
socket.on('disconnect', function() {
    console.log('Se perdió la conexión con el servidor.');
});
socket.on('estadoActual', function(data) {
    console.log(data);
    actualizaHTML(data.ultimos4);
});
// on 'ultimos4'
socket.on('ultimos4', function(data) {
    actualizaHTML(data.ultimos4);
});

function actualizaHTML(ultimos4) {
    for (var i = 0; i < (ultimos4.length); i++) {
        lblTurnos[i].text('Turno ' + ultimos4[i].numero);
        lblVentanillas[i].text('Ventanilla ' + ultimos4[i].ventanilla);
        console.log('Turno ' + ultimos4[i].numero + ' en Ventanilla ' + ultimos4[i].ventanilla);
    }
}