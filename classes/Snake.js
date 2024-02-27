'use strict';

import helpers from '../helpers.js';
import settings from '../settings.js';
import Bodypart from './Bodypart.js';

class Snake {
    constructor(socket) {
        this.x = Math.random();
        this.y = Math.random();
        this.radius = .01;
        this.angle = helpers.createNumber(0, 360) / 180 * Math.PI;
        this.speedRotation = .05;
        this.speed = .005;
        this.score = 0;
        this.socketID = socket.id;
        this.einflussBereich = .01;
        this.color = `hsl(${~~(Math.random() * 360)},80%,70%)`;
        this.bodyParts=[]
    }
    userInput(data) {
        this.angle -= data.rotation * this.speedRotation;
        this.angle += (Math.PI * 2);
        this.angle = this.angle % (Math.PI * 2);
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
    }
    init() {

    }
}
export default Snake;