'use strict';

import settings from "./settings.js";
import Snake from './classes/Snake.js';
import Drop from './classes/Drop.js';

const game = {
    update(io) {
        settings.snakes.forEach(snake => snake.update());
        settings.drops.forEach(drop=> drop.update());
        io.emit('update', settings.snakes)
    },
    addDrop() {

    },
    addSnake(socket) {
        let mySnake = new Snake(socket);
        settings.snakes.push(mySnake)
        return mySnake;
    },
    removeSnake(socket) {
        settings.snakes = settings.snakes.filter(snake => snake.socketID != socket.id);
    },
    init() {
        // Spiel starten
        settings.timerID = setInterval(
            game.update,
            settings.intervalDelay
        )
    }
}

export default game;