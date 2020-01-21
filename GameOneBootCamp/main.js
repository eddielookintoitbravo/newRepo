import Paddle from './paddle.js'
import Handler from './input.js'
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height;

const paddle = new Paddle(gameWidth, gameHeight);
const handler = new Handler(paddle);

let lastTime = 0;

function animate(timestamp) {
    let dt = timestamp - lastTime;
    lastTime = timestamp;
    paddle.update(c);
    // paddle.moveRightConst(c, dt, 20);
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)