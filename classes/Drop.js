'use strict';

class Drop {
    constructor(numAdd = 1) {
        this.x = Math.random();
        this.y = Math.random();
        this.numAdd = numAdd;
        this.size = .015;
        this.extra = false;

        if (Math.random() < .05) {
            this.extra = 'fast'
        }

    }
    update() {

    }
}

export default Drop;