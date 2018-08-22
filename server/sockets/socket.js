const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTurno', (data, callback) => {
        if (data) {
            console.log('Datos recibidos del cliente: ' + data);
        }
        let siguiente = ticketControl.siguienteTurno();
        console.log('El siguiente turno es el: ' + siguiente);
        let resp = siguiente;
        client.broadcast.emit('estadoActual', {
            actual: resp
        });
        callback(resp);
    });

    // Emitir un evento 'estadoActual'
    // Debe regresar:
    //{
    //  actual: ticketControl.getUltimoTurno()
    //}
    //client.broadcast.emit('estadoActual', { // No funciona con el navegador conectado más recientemente... ¿por qué?
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTurno()
    });
});