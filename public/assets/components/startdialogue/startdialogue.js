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

    // Nicht-String-Atribute übergeben
    setAttributes({ }) {
        this.render();
    }

    // Componente rendern
    render() {
        let container = this.root.querySelector('.container')
        template.className = 'container';
        container.innerHTML = ''
    }

    // Erwartete String-Attribute
    static get observedAttributes() {
        return ['my-attribute']
    }

    // Getter und Setter für String-Attribute
    get 'my-attribute'() {
        return this.getAttribute('my-attribute')
    }
    set 'my-attribute'(val) {
        this.setAttribute('my-attribute', val);
    }

    // Eventlistener für veränderte Attribute
    attributeChangedCallback(attrName, oldVal, currentVal) {
    }
    // Eventlistener für Mounting
    connectedCallback() {
    }
    // Eventlistener für Unmounting
    disconnectedCallback() {
    }
}

customElements.define('start-dialogue', Start);