'use strict';

import template from './template.js';

class restart extends HTMLElement {
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

        const evtStart = new CustomEvent('start');
        const evtObserve = new CustomEvent('observe');

        btnStart.addEventListener('click', () => {
            this.dispatchEvent(evtStart);
            this.remove();
        })
        
        btnObserve.addEventListener('click', () => {
            this.dispatchEvent(evtObserve);
            this.remove();
        })
    }
    // Eventlistener für Unmounting
    disconnectedCallback() {
    }
}

customElements.define('restart-dialogue', restart);