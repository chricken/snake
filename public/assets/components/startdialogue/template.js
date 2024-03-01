'use strict';

const template = document.createElement('div');

let path = new URL(import.meta.url).pathname;
path = `${path.substring(0, path.lastIndexOf('/') + 1)}styles.css`;
const elStyle = document.createElement('style');
elStyle.innerHTML = `@import "${path}"`;
template.append(elStyle);

const bg = document.createElement('div');
bg.className = 'bg';
template.append(bg);

const elMsg = document.createElement('div');
elMsg.className = 'msg';
bg.append(elMsg);

const elContent = document.createElement('p');
elMsg.append(elContent);
elContent.innerHTML = `<h3>Willkommen bei Schnake</h3>
Bitte wählen Sie, ob Sie das Spiel starten oder als Beobachter beitreten wollen.<br>
Zum Mitspielen, wählen Sie außerdem einen Namen und eine Farbe.<br>
Um diese zu ändern, musst Du das Spiel neu laden.
`

// Eingabe des Namens
const elInputName = document.createElement('div');
elMsg.append(elInputName);

const legendName = document.createElement('span');
elInputName.append(legendName);
legendName.innerHTML = 'Ihr Name: ';

const inputName = document.createElement('input');
inputName.type = 'text';
inputName.name = 'name';
let num = ~~(Math.random() * 1e6);
console.log(num);
inputName.value = `Player ${num.toString(36)}`;
elInputName.append(inputName);

// EIngabe der Farbe
const elInputColor = document.createElement('div');
elMsg.append(elInputColor);

const legendColor = document.createElement('span');
legendColor.innerHTML = 'Ihre Zeichenfarbe: ';
elInputColor.append(legendColor);

const hex = () => Math.floor(Math.random() * 16).toString(16);
const inputColor = document.createElement('input');
inputColor.type = 'color';
inputColor.name = 'color';
inputColor.value = '#' + hex() + hex() + hex() + hex() + hex() + hex();
elInputColor.append(inputColor);
console.log(inputColor.value);

const containerBtns = document.createElement('div');
containerBtns.className = 'containerBtns';
elMsg.append(containerBtns);

const btnStart = document.createElement('button');
btnStart.className = 'btnStart';
containerBtns.append(btnStart);
btnStart.innerHTML = 'Start';

const btnObserve = document.createElement('button');
btnObserve.className = 'btnObserve';
containerBtns.append(btnObserve);
btnObserve.innerHTML = 'Observe';


export default template;