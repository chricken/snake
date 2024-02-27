'use strict';

class Bodypart {
    constructor(x = -1000, y = -1000, bufferLength = 3) {
        this.x = x;
        this.y = y;
        this.buffer = [...new Array(bufferLength)].map(() => {
            return { x, y }
        });
    }
    update(x, y) {
        // console.log('update', this.buffer, this.buffer.length);
        for (let i = this.buffer.length - 1; i > 0; i--) {
            // console.log(i, this.buffer[i]);
            this.buffer[i] = { ...this.buffer[i - 1] };
        }
        // An die erste Stelle des Buffer den neuen Wert übertragen
        this.buffer[0] = { x, y };

        // Die letzte Stelle des Buffer an den Bodypart übergeben
        this.x = this.buffer[this.buffer.length-1].x;
        this.y = this.buffer[this.buffer.length-1].y;
    }
}

export default Bodypart;