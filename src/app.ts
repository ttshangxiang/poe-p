import PEvents from './PEvents'

const main = document.getElementById('main');
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
main.appendChild(canvas);
new PEvents({main, canvas});

const ctx = canvas.getContext('2d');
const img = document.createElement('img');
img.src = './assets/images/passive-skill-sprite/groups-3.png';
img.onload = () => {
  ctx.drawImage(img, 0, 0, 800, 800);
}