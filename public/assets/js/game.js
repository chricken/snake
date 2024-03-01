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
        settings.socket.emit('createSnake', {
            name: evt.detail ? evt.detail.name : settings.snake.color,
            color: evt.detail ? evt.detail.color : settings.snake.name,
        });
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
    init() {
        game.createSpielfeld();

        window.addEventListener('resize', game.resizeSpielfeld);

        // Spiel starten
        // game.update();
        game.startDialogue();

    }
}

export default game;