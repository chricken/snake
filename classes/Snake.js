'use strict';

import helpers from '../helpers.js';
import settings from '../settings.js';
import Bodypart from './Bodypart.js';

class Snake {
    constructor(socket) {
        this.x = Math.random();
        this.y = Math.random();
        this.radius = .01;
        this.radiusRatioHeadBody = .8;
        this.angle = helpers.createNumber(0, 360) / 180 * Math.PI;
        this.speedRotation = .12;
        this.speed = .008;
        this.score = 0;
        this.socketID = socket.id;
        this.einflussBereich = .015;
        this.color = `hsl(${~~(Math.random() * 360)},80%,70%)`;
        this.bodyParts = [
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
            new Bodypart(),
        ]
    }
    userInput(data) {
        this.angle -= data.rotation * this.speedRotation;
        this.angle += (Math.PI * 2);
        this.angle = this.angle % (Math.PI * 2);
    }
    updateBodyParts() {

        if (this.bodyParts.length) {
            // update() überträgt die neue Position in einen Puffer. 
            // Hier wird er schrittweise nach hinten weitergereicht, bis er angezeigt wird.
            this.bodyParts[0].update(this.x, this.y);
            for (let i = 1; i < this.bodyParts.length; i++) {
                // Die Position des vorherigen Bodyparts wird an den Puffer des nächsten übergeben
                this.bodyParts[i].update(
                    this.bodyParts[i - 1].x,
                    this.bodyParts[i - 1].y,
                )
            }
        }
    }
    update() {
        // Kopf bewegen
        let deltaX = Math.sin(this.angle) * this.speed;
        let deltaY = Math.cos(this.angle) * this.speed;

        this.x += deltaX;
        this.y += deltaY;

        if (this.x > 1) this.x = 0;
        if (this.x < 0) this.x = 1;
        if (this.y > 1) this.y = 0;
        if (this.y < 0) this.y = 1;

        this.hitTest();

        this.updateBodyParts();
    }
    kill(){
        let socket = settings.sockets[this.socketID];
        socket.emit('you are dead');
    }
    hitTest() {
        // Hittest gegen die Drops
        for (let i = 0; i < settings.drops.length; i++) {
            let drop = settings.drops[i];
            let distance = Math.hypot(
                this.x - drop.x,
                this.y - drop.y,
            )
            if (distance <= this.einflussBereich) {
                settings.drops = settings.drops.filter(el => el != drop);
                this.bodyParts.push(new Bodypart());
            }
        }

        // Hittest gegen die anderen Schlangen
        for (let i = 0; i < settings.snakes.length; i++) {
            let snake = settings.snakes[i];
            for (let j = 0; j < snake.bodyParts.length; j++) {

                let part = snake.bodyParts[j];
                let distance = Math.hypot(
                    this.x - part.x,
                    this.y - part.y,
                )
                if (distance <= this.einflussBereich) {
                    // Erstmal die Snake entfernen
                    // console.log('hit', snake);
                    settings.snakes = settings.snakes.filter(s => s != this);
                    this.kill();
                }
            }
        }
    }
    init() {

    }
}
export default Snake;