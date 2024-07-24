/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const H = 400;
const W = 400;
const aspectRatio = W / H;

canvas.height = H;
canvas.width = W;

const pos = canvas.getBoundingClientRect();

// For Canvas size W x H, center point is: (W/2, H/2);
// Corners
const CENTER = [W / 2, H / 2];
const TOPLEFT = [0, 0];
const TOPRIGHT = [W, 0];
const BOTTOMLEFT = [0, H];
const BOTTOMRIGHT = [W, H];

class CanvasObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.strokeStyle = 'black';
        this.lineWidth = '2'
    }

    draw = () => { }
}

class Square extends CanvasObject {
    constructor(x, y, w, h) {
        super(x, y);
        this.w = w;
        this.h = h;
    }

    draw = (t) => {
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.stroke();
    }
}


class Circle extends CanvasObject {
    constructor(x, y, r, sA, eA) {
        super(x, y);
        this.r = r;
        this.sA = sA;
        this.eA = eA;
    }

    draw = (t) => {
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.x, this.y, this.r + t, this.sA, this.eA);
        ctx.stroke();
    }
}

let canvasObjects = [];

canvas.addEventListener('click', e => {
    const { clientX, clientY } = e;
    const newPos = { x: clientX - pos.x, y: clientY - pos.y };
    canvasObjects.push(new Circle(newPos.x, newPos.y, 1, 0, 2 * Math.PI));
})


const clearCanvas = (x = 0, y = 0, w = W, h = H) => { ctx.clearRect(x, y, w, h) };
const resetState = () => { canvasObjects = [] };

let frameRequest = 0;
let isPaused = false;
function main() {
    clearCanvas();

    for (let obj of canvasObjects) {
        obj.draw(obj.r += .1);
    }

    // Loop
    frameRequest = requestAnimationFrame(main);
}

main();
handlePauseStateViewStyle();


// HTML Dynamics

function handlePauseStateViewStyle() {
    if (isPaused) {
        canvas.classList.add('stopped')
        canvas.classList.remove('playing');
    } else {
        canvas.classList.add('playing')
        canvas.classList.remove('stopped');
    }
}

function handlePause() {
    if (isPaused) {
        main();
        isPaused = false;
    } else {
        cancelAnimationFrame(frameRequest);
        isPaused = true;
    }
    handlePauseStateViewStyle();
}

window.addEventListener('keyup', e => {
    switch (e.key) {
        case 'r':
            resetState();
            clearCanvas();
            break;
        case 'c':
            clearCanvas();
            break;
        case 'p':
            handlePause();
            break;
        default:
            break;
    }
})