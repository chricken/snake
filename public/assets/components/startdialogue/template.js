'use strict';

const template = document.createElement('div');

let path = new URL(import.meta.url).pathname;
path = `${path.substring(0, path.lastIndexOf('/') + 1)}styles.css`;
const elStyle = document.createElement('style');
elStyle.innerHTML = `@import "path"`;
template.append(elStyle);

const bg = document.createElement('div');
bg.className = 'bg';
template.append(bg);

const elMsg = document.createElement('div');
elMsg.className = 'msg';
bg.append(elMsg);

const elSlot = document.createElement('slot');
elMsg.append(elSlot);

const btnClose = document.createElement('button');
elMsg.append(btnClose);
btnClose.innerHTML = 'Close';


export default template;