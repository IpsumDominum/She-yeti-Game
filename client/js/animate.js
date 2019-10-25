/*
let img = new Image();
img.src = '/client/img/capguy.png';
img.onload = function() {
  init();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scale = 2;
const width = img.width/3;
const height = img.height/4;
var scaledWidth = width *scale;
var scaledHeight = height *scale;
const framerate = 20;
const cycleLoop = [0,1,0,2];
let idx = 0;
let count = 0;

function step(timestamp){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(cycleLoop[idx], 0, 0, 0);
  idx = (idx +1) % cycleLoop.length;
  window.requestAnimationFrame(step);
}

function init() {
  window.requestAnimationFrame(step);
}
function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}
*/