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
        let resp = `Siguiente turno: ${siguiente}`;
        client.broadcast.emit('siguienteTurnoAsignado', resp);
        callback(resp);
    });

    /*
        console.log('Usuario conectado');

        client.emit('enviarMensaje', {
            usuario: 'Administrador',
            mensaje: 'Bienvenido a esta aplicación'
        });



        client.on('disconnect', () => {
            console.log('Usuario desconectado');
        });

        // Escuchar el cliente
        client.on('enviarMensaje', (data, callback) => {

            console.log(data);

            client.broadcast.emit('enviarMensaje', data);


            // if (mensaje.usuario) {
            //     callback({
            //         resp: 'TODO SALIO BIEN!'
            //     });

            // } else {
            //     callback({
            //         resp: 'TODO SALIO MAL!!!!!!!!'
            //     });
            // }



        });
    */
});