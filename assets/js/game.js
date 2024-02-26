'use strict';

import settings, {elements} from "./settings.js";
import Snake from './classes/snake.js';

const game = {
    update() {
        settings.snake.update();

        game.render();
    },
    render() {
        let c = elements.spielfeld;
        let ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);

        settings.snake.render();

    },
    addDrop() {

    },
    createSpielfeld() {
        let c = document.createElement('canvas');
        c.width = settings.spielfeldWidth;
        c.height = settings.spielfeldHeight;
        elements.main.append(c);
        elements.spielfeld = c;
    },
    init() {
        // Schlange anlegen
        settings.snake = new Snake();

        game.createSpielfeld();

        // Spiel starten
        settings.timerID = setInterval(
            game.update,
            settings.intervalDelay
        )
    }
}

export default game;