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
    render(snakes, drops) {
        let c = elements.spielfeld;
        let ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);

        ctx.strokeStyle = '#000';


        // Schlangen iterieren
        snakes.forEach(snake => {
            ctx.beginPath();
            if (snake.socketID == settings.socket.id) {
                // Score schreiben
                elements.score.innerHTML = snake.bodyParts.length;

                // Schlange zeichnen
                ctx.fillStyle = snake.color;
                ctx.lineWidth = .003 * c.width;
                let deltaX = Math.sin(snake.angle) * snake.speed;
                let deltaY = Math.cos(snake.angle) * snake.speed;
                // "Nase"
                ctx.moveTo(
                    (snake.x + deltaX) * c.width,
                    (snake.y + deltaY) * c.height,
                )
                ctx.lineTo(
                    (snake.x + (deltaX * 4)) * c.width,
                    (snake.y + (deltaY * 4)) * c.height,
                )
            } else {
                ctx.fillStyle = snake.color;
                ctx.lineWidth = .001 * c.width;
            }
            ctx.moveTo(
                (snake.x * c.width) + (snake.radius * c.width),
                (snake.y * c.height)
            )
            ctx.arc(
                snake.x * c.width,
                snake.y * c.height,
                snake.radius * c.width,
                0,
                2 * Math.PI
            )

            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = snake.color;

            for (let i = 0; i < snake.bodyParts.length; i++) {
                let part = snake.bodyParts[i];
                ctx.moveTo(
                    (part.x * c.width) + (snake.radius * c.width * snake.radiusRatioHeadBody),
                    (part.y * c.height)
                )
                ctx.arc(
                    part.x * c.width,
                    part.y * c.height,
                    snake.radius * c.width * snake.radiusRatioHeadBody,
                    0,
                    2 * Math.PI
                )
            }

            ctx.fill();
            ctx.stroke();
        })

        // Drops iterieren
        drops.forEach(drop => {

            if (drop.extra == 'fast') {
                ctx.fillStyle = '#fa5';
                ctx.beginPath();
                ctx.arc(
                    drop.x * c.width,
                    drop.y * c.height,
                    (drop.size/2) * c.width,
                    0,
                    2 * Math.PI
                )
                ctx.fill();
                ctx.stroke();

            } else {
                /*
                ctx.fillStyle = '#000';
                ctx.fillRect(
                    (drop.x - drop.size / 2) * c.width,
                    (drop.y - drop.size / 2) * c.height,
                    drop.size * c.width,
                    drop.size * c.height,
                )
                */

                ctx.fillStyle = '#000';
                ctx.font = `${drop.size * c.width}px Tahoma, Geneva, Verdana, sans-serif`;
                ctx.fillText(
                    drop.numAdd,
                    (drop.x - drop.size / 2.5) * c.width,
                    (drop.y + drop.size / 2.5) * c.height
                );
            }

        })
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
    start() {
        settings.socket.emit('createSnake');
        clearInterval(settings.timerID);
        settings.timerID = setInterval(
            game.update,
            settings.intervalDelay
        )
    },
    observe() { },
    startDialogue() {
        const startDialogue = document.createElement('start-dialogue');
        startDialogue.innerHTML = `
        Willkommen bei Schnake.<br />
        <br />
        Wähle, ob Du das Spiel starten oder als Beobachter beitreten willst.
        `;

        startDialogue.addEventListener('start', game.start);
        startDialogue.addEventListener('observe', game.observe);

        document.body.append(startDialogue);
    },
    restartDialogue() {
        const startDialogue = document.createElement('start-dialogue');
        startDialogue.innerHTML = `
        Du bist mit einer Schlange kollidiert.<br />
        <br />
        Willst Du das Spiel neu starten oder nur beobachten?
        `;

        startDialogue.addEventListener('start', game.start);
        startDialogue.addEventListener('observe', game.observe);

        document.body.append(startDialogue);
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