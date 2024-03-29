'use strict';

// Import 
import settings, { elements } from './settings.js';
import game from './game.js';
import render from './render.js';
import '/assets/components/startdialogue/startdialogue.js'
import '/assets/components/restartdialogue/restartdialogue.js';

// KONSTANTEN / VARIABLEN

// FUNKTIONEN
const domMapping = () => {
    elements.main = document.querySelector('main');
    elements.score = document.querySelector('#score');
    elements.names = document.querySelector('#names');
}

const appendEventlisteners = () => {
    window.addEventListener('keydown', evt => {
        switch (evt.key) {
            case 'ArrowLeft':
            case 'a':
                settings.rotation = -1
                break;
            case 'ArrowRight':
            case 'd':
                settings.rotation = 1
                break;
        }
    })
    window.addEventListener('keyup', evt => {
        switch (evt.key) {
            case 'ArrowLeft':
            case 'a':
            case 'ArrowRight':
            case 'd':
                settings.rotation = 0;
                break;
        }
    })
}

const appendSocketEventListener = socket => {
    socket.on('update', render.all);
    socket.on('you are dead', game.kill);
    socket.on('updateSnakeData', game.updateSnakeData);
}

const init = () => {
    settings.socket = io.connect();
    domMapping();
    appendEventlisteners();
    appendSocketEventListener(settings.socket);
    game.init();
}

// INIT
init();