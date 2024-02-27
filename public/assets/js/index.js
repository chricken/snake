'use strict';

// Import 
import settings, { elements } from './settings.js';
import game from './game.js';

// KONSTANTEN / VARIABLEN

// FUNKTIONEN
const domMapping = () => {
    elements.main = document.querySelector('main');
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
            case 'd':
                if (settings.timerID) {
                    clearInterval(settings.timerID);
                    settings.timerID = false;
                } else {
                    settings.timerID = setInterval(
                        game.update,
                        settings.intervalDelay
                    )
                }
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
    socket.on('update', game.render);
    socket.on('you are dead', game.kill);
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