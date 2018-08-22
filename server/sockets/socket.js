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

    //client.broadcast.emit('estadoActual', { // No funciona con el navegador conectado más recientemente... ¿por qué?
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTurno(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTurno', (data, callback) => {
        if (!data.ventanilla) {
            return callback({
                err: true,
                mensaje: 'Es necesario proporcionar el número de ventanilla.'
            });
        }
        let atenderTicket = ticketControl.atenderTurno(data.ventanilla);
        callback(atenderTicket);

        // Actualizar / notificar cambios en los Últimos 4
        // Emitir ultimos4
        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimoTurno(),
            ultimos4: ticketControl.getUltimos4()
        });
    });
});