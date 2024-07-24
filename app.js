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
let canvasObjects = [];

canvas.addEventListener('click', e => {
    const { clientX, clientY } = e;
    const newPos = { x: clientX - pos.x, y: clientY - pos.y };
    canvasObjects.push(new CustomCircle(newPos.x, newPos.y, CENTER, ctx));
})

const clearCanvas = (x = 0, y = 0, w = W, h = H) => { ctx.clearRect(x, y, w, h) };
const resetState = () => { canvasObjects = [] };

let frameRequest = 0;
let isPaused = false;

function main() {
    clearCanvas();

    for (let obj of canvasObjects) {
        obj.draw(frameRequest);
    }

    // Loop
    frameRequest = requestAnimationFrame(main);
}

main();
handlePauseStateViewStyle();


const radiansToDegrees = r => r * (180/Math.PI);

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