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
    render(data) {
        /*
        console.clear();
        console.log(JSON.stringify(data)); 
        */

        let c = elements.spielfeld;
        let ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        // Schlangen iterieren
        data.forEach(snake => {
            ctx.beginPath();
            ctx.fillStyle = snake.color;
            ctx.arc(
                snake.x * c.width,
                snake.y * c.height,
                snake.radius * c.width,
                0,
                2 * Math.PI
            )
            ctx.fill();
            ctx.stroke();
        })

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
        game.createSpielfeld();

        // Spiel starten
        // game.update();

        settings.timerID = setInterval(
            game.update,
            settings.intervalDelay
        )

    }
}

export default game;