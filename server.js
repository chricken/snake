'use strict';

// Module
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// Eigene
import game from './game.js';
import settings from './settings.js';

// Express
const expressServer = express();
expressServer.use(express.static('public'));

// HTTP
const httpServer = http.Server(expressServer);

// Websocket
const io = new Server(httpServer);

// Socket-Eventlistener
io.on('connect', socket => {
    // console.log(socket.id);

    // Sockets und Snakes einhängen
    settings.sockets[socket.id] = socket;
    let mySnake;

    socket.on('update', data => {
        // console.log(data);
        mySnake.userInput(data)
    });

    socket.on('createSnake', data => {
        //delete settings.sockets[socket.id];
        mySnake = game.addSnake(socket, data);
        socket.emit('updateSnakeData', mySnake);
    })

    // Browser hat das Spiel verlassen
    socket.on('disconnect', () => {
        game.removeSnake(socket);
        delete settings.sockets[socket.id];
    })
})

// Server starten
const init = () => {
    httpServer.listen(80, err => {
        if (err) console.log(err);
        else {
            console.log('Server läuft');
            game.init(io);
        }

    })
}

init();