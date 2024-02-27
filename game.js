'use strict';

import settings from "./settings.js";
import Snake from './classes/Snake.js';
import Drop from './classes/Drop.js';
import helpers from './helpers.js';

const game = {
    update(io) {
        settings.snakes.forEach(snake => snake.update());
        settings.drops.forEach(drop => drop.update());
        io.emit('update', settings.snakes, settings.drops);

    },
    timedDrop() {
        game.addDrop();
        settings.dropDelay = helpers.createNumber(
            settings.dropDelayMin,
            settings.dropDelayMax
        )
        setTimeout(game.timedDrop, settings.dropDelay)
    },
    addDrop() {
        settings.drops.push(new Drop(3))
    },
    addSnake(socket) {
        let mySnake = new Snake(socket);
        settings.snakes.push(mySnake)
        return mySnake;
    },
    removeSnake(socket) {
        settings.snakes = settings.snakes.filter(snake => snake.socketID != socket.id);
    },
    init(io) {
        // Spiel starten
        settings.timerID = setInterval(
            game.update,
            settings.intervalDelay,
            io
        )

        for (let i = 0; i < settings.startDrops; i++) {
            game.addDrop();
        }

        // Timeout für Drops
        setTimeout(game.timedDrop, settings.dropDelay)
    }
}

export default game;