'use strict';

import helpers from '../helpers.js';
import settings, {elements} from '../settings.js';

class Snake {
    constructor() {
        this.x = helpers.createNumber(0, settings.numCols);
        this.y = helpers.createNumber(0, settings.numRows);
        this.radius = 10;
        this.angle = helpers.createNumber(0, 360) / 180 * Math.PI;
        this.speedRotation = .01;
        this.speed = .01;
    }
    update() {
        // Kopf bewegen
        let deltaX = Math.sin(this.angle) * this.speed;
        let deltaY = Math.cos(this.angle) * this.speed;

        this.x += deltaX;
        this.y += deltaY;

        if(this.x > 1) this.x = 0;
        if(this.x < 0) this.x = 1;
        if(this.y > 1) this.y = 0;
        if(this.y < 0) this.y = 1;
    }
    render() {
        let c = elements.spielfeld;
        let ctx = c.getContext('2d');

        ctx.beginPath();
        ctx.arc(
            this.x * c.width,
            this.y * c.height,
            this.radius,
            0,
            2 * Math.PI
        )
        ctx.fill();

    }
    rotateLeft() {
        console.log(this.angle);
        this.angle -= this.speedRotation;
    }
    rotateRight() {
        this.angle += this.speedRotation;
    }
    init() {

    }
}
export default Snake;