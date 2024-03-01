'use strict';

import settings, { elements } from "./settings.js";

const render = {
    renderSnakes(snakes) {
        let c = elements.spielfeld;
        let ctx = c.getContext('2d');

        snakes.forEach(snake => {
            // Kopfposition an index 0 hängen, um die Entfernungsüberprüfung machen zu können.
            // Ohne die wird bei Seitenwechsel eine Verbindungslinie gezeichnet
            snake.bodyParts.unshift({
                x: snake.x,
                y: snake.y
            })
            // Schlangenkörperumrandung
            if (snake.socketID == settings.socket.id) {
                elements.score.innerHTML = snake.bodyParts.length;
                ctx.lineWidth = snake.radius * 2 * c.width;
            } else {
                ctx.lineWidth = snake.radius * 2 * c.width * snake.radiusRatioHeadBody + 1;
            }

            ctx.strokeStyle = '#000';
            ctx.lineCap = 'round'
            ctx.beginPath();

            ctx.moveTo(
                snake.x * c.width,
                snake.y * c.height
            )

            for (let i = 1; i < snake.bodyParts.length; i++) {
                let previous = snake.bodyParts[i - 1];
                let part = snake.bodyParts[i];

                // Wenn das Teil zu weit weg ist, Linie neu beginnen
                let distance = Math.hypot((part.x - previous.x), (part.y - previous.y));
                distance *= c.width;
                if (distance > (c.width / 2)) {
                    ctx.stroke();
                    ctx.beginPath();
                }

                ctx.lineTo(
                    part.x * c.width,
                    part.y * c.height
                )
            }

            ctx.stroke();


            // Schlangenkörperinneres zeichnen
            ctx.lineWidth = snake.radius * 2 * c.width * snake.radiusRatioHeadBody;

            ctx.strokeStyle = snake.color;
            ctx.lineCap = 'round'
            ctx.beginPath();

            ctx.moveTo(
                snake.x * c.width,
                snake.y * c.height
            )

            for (let i = 1; i < snake.bodyParts.length; i++) {
                let previous = snake.bodyParts[i - 1];
                let part = snake.bodyParts[i];

                // Wenn das Teil zu weit weg ist, Linie neu beginnen
                let distance = Math.hypot((part.x - previous.x), (part.y - previous.y));
                distance *= c.width;
                if (distance > (c.width / 2)) {
                    ctx.stroke();
                    ctx.beginPath();
                }

                ctx.lineTo(
                    part.x * c.width,
                    part.y * c.height
                )
            }

            ctx.stroke();

            // Nase zeichnen
            ctx.strokeStyle = '#000';
            if (snake.socketID == settings.socket.id) {
                ctx.beginPath();
                ctx.fillStyle = snake.color;
                ctx.lineWidth = .003 * c.width;
                let deltaX = Math.sin(snake.angle) * snake.speed;
                let deltaY = Math.cos(snake.angle) * snake.speed;

                ctx.moveTo(
                    (snake.x + deltaX) * c.width,
                    (snake.y + deltaY) * c.height,
                )
                ctx.lineTo(
                    (snake.x + (deltaX * 4)) * c.width,
                    (snake.y + (deltaY * 4)) * c.height,
                )
                ctx.stroke();
            }


            // Kopf zeichnen
            if (snake.socketID == settings.socket.id) {
                ctx.lineWidth = .003 * c.width;
            } else {
                ctx.lineWidth = .001 * c.width;

            }
            ctx.beginPath();
            ctx.fillStyle = snake.color;
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

        })
    },
    renderDrops(drops) {
        let c = elements.spielfeld;
        let ctx = c.getContext('2d');
        drops.forEach(drop => {

            if (drop.extra == 'fast') {
                ctx.fillStyle = '#fa5';
                ctx.beginPath();
                ctx.arc(
                    drop.x * c.width,
                    drop.y * c.height,
                    (drop.size / 2) * c.width,
                    0,
                    2 * Math.PI
                )
                ctx.fill();
                ctx.stroke();

            } else {

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
    names(snakes) {
        elements.names.innerHTML = '';

        snakes.forEach(snake => {
            let nameContainer = document.createElement('div');
            elements.names.append(nameContainer);

            let elColor = document.createElement('span');
            elColor.className = 'snakeColor'
            elColor.style.backgroundColor = snake.color;
            nameContainer.append(elColor);

            let elName = document.createElement('span');
            elName.innerHTML = snake.name;
            nameContainer.append(elName);
        })
    },
    all(snakes, drops) {
        let c = elements.spielfeld;
        let ctx = c.getContext('2d');
        settings.snake = snakes.find(snake => snake.socketID == settings.socket.id);

        ctx.clearRect(0, 0, c.width, c.height);
        render.names(snakes);
        render.renderSnakes(snakes);
        render.renderDrops(drops);
    }
}

export default render;
