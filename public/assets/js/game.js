'use strict';

import settings, { elements } from "./settings.js";

const game = {
    update() {
        if (settings.socket) {
            settings.socket.emit('update', {
                rotation: settings.rotation
            })
        }
    },
    kill() {
        clearInterval(settings.timerID)
        game.restartDialogue();
    },
    resizeSpielfeld() {

        let w = window.innerWidth * .98;
        let h = window.innerHeight * .98;

        elements.spielfeld.width = Math.min(w, h);
        elements.spielfeld.height = Math.min(w, h);

    },
    createSpielfeld() {
        let c = document.createElement('canvas');
        c.width = settings.spielfeldWidth;
        c.height = settings.spielfeldHeight;
        elements.main.append(c);
        elements.spielfeld = c;
        game.resizeSpielfeld();
    },
    start(evt) {
        if (evt.detail) {
            settings.socket.emit('createSnake', {
                name: evt.detail.name,
                color: evt.detail.color
            });
        } else {
            settings.socket.emit('createSnake', {
                name: settings.snake.name,
                color: settings.snake.color
            });
        }
        clearInterval(settings.timerID);
        settings.timerID = setInterval(
            game.update,
            settings.intervalDelay
        )
    },
    observe() { },
    startDialogue() {
        const startDialogue = document.createElement('start-dialogue');

        startDialogue.addEventListener('start', game.start);
        startDialogue.addEventListener('observe', game.observe);

        document.body.append(startDialogue);
    },
    restartDialogue() {
        const restartDialogue = document.createElement('restart-dialogue');

        restartDialogue.addEventListener('start', game.start);
        restartDialogue.addEventListener('observe', game.observe);

        document.body.append(restartDialogue);
    },
    updateSnakeData(snake){
        settings.snake = snake;
    },
    init() {
        game.createSpielfeld();

        window.addEventListener('resize', game.resizeSpielfeld);

        // Spiel starten
        // game.update();
        game.startDialogue();

    }
}

export default game;