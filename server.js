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
    let mySnake = game.addSnake(socket);

    socket.on('update', data => {
        mySnake.userInput(data)
    });

    socket.on('replay', () => {
        // delete settings.sockets[socket.id];
        mySnake = game.addSnake(socket);
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
            /*
            settings.timerID = setInterval(
                game.update,
                settings.intervalDelay,
                io
            );
            */
        }

    })
}

init();