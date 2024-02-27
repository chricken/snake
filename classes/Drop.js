'use strict';

class Drop {
    constructor(numAdd = 1) {
        this.x = Math.random();
        this.y = Math.random();
        this.numAdd = numAdd;
        this.size = .015;
    }
    update(){

    }
}

export default Drop;