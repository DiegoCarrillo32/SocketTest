//Server de express
const express = require('express');
//Server de socket.io
const http = require('http')

const socketio = require('socket.io');

const Sockets = require('./sockets');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Server 
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {  });
    }

    execute() {
        // Init middleware
        this.middleware();
        // Init socket events
        this.setSocketEvents()
        // Start server
        this.server.listen(this.port, () => {
            console.log('listening on *:', this.port);
        })
    }

    setSocketEvents(){
        new Sockets(this.io)
    }

    middleware(){
        //Despegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));

    }

}


module.exports = Server;