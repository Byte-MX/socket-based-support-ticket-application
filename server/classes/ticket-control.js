const fs = require('fs');

class Ticket {
    constructor(numero, ventanilla) {
        this.numero = numero;
        this.ventanilla = ventanilla;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.pendingTickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.pendingTickets = data.pendingTickets;
            if (!this.pendingTickets) {
                this.pendingTickets = [];
            }
            this.ultimos4 = data.ultimos4;
            if (!this.ultimos4) {
                this.ultimos4 = [];
            }
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTurno() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null); // Aún no sabemos quién lo atiende
        this.pendingTickets.push(ticket);
        this.grabarArchivo();
        return `Turno ${this.ultimo}`;
    }

    getUltimoTurno() {
        return `Turno ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }
    atenderTurno(ventanilla) {
        if (this.pendingTickets.length === 0) {
            return 'No hay turnos pendientes';
        }
        let numeroTicket = this.pendingTickets[0].numero;
        this.pendingTickets.shift();

        let atenderTicket = new Ticket(numeroTicket, ventanilla);
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            // Quitar el último
            this.ultimos4.splice(-1, 1); // Borra el último
        }
        console.log('Últimos 4');
        console.log(this.ultimos4);
        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.pendingTickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema...');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            pendingTickets: this.pendingTickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}