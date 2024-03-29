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
    addDrop(ignoreSnake = false) {
        if (settings.snakes.length || ignoreSnake) {
            settings.drops.push(new Drop(
                helpers.createNumber(
                    settings.minDropsToAdd,
                    settings.maxDropsToAdd
                )
            ))
        }
    },
    addSnake(socket, data) {
        let mySnake = new Snake(socket);
        mySnake.color = data.color;
        mySnake.name = data.name;
        // Vorsichtshalber nochmal löschen
        settings.snakes = settings.snakes.filter(snake => snake.socketID != socket.id);
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
            game.addDrop(true);
        }

        // Timeout für Drops
        setTimeout(game.timedDrop, settings.dropDelay)
    }
}

export default game;