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
                settings.snake.rotateLeft()
                break;
            case 'ArrowRight':
            case 'd':
                settings.snake.rotateRight()
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
}

const init = () => {
    domMapping();
    appendEventlisteners();
    game.init();
}

// INIT
init();