'use strict';

import template from './template.js';

class Start extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'closed'
        })
        this.root.append(template.cloneNode(true));
    }

    // Eventlistener für Mounting
    connectedCallback() {
        const btnStart = this.root.querySelector('.btnStart');
        const btnObserve = this.root.querySelector('.btnObserve');
        const inputName = this.root.querySelector('input[name="name"]');
        const inputColor = this.root.querySelector('input[name="color"]');


        btnStart.addEventListener('click', () => {
            const evtStart = new CustomEvent('start', {
                detail: {
                    name: inputName.value,
                    color: inputColor.value
                }
            });
            this.dispatchEvent(evtStart);
            this.remove();
        })

        btnObserve.addEventListener('click', () => {
            const evtObserve = new CustomEvent('observe');
            this.dispatchEvent(evtObserve);
            this.remove();
        })
    }
    // Eventlistener für Unmounting
    disconnectedCallback() {
    }
}

customElements.define('start-dialogue', Start);