const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraser = document.getElementById("jsEraser");
const clear = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;
let erasing = false;

init();

function init() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = 2.5;

    painting = false;
    filling = false;
    erasing = false;
    eraserInit();
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
        eraserInit();
    } else {
        filling = true;
        mode.innerText = "Paint";
        eraserInit();
    }
}

function handleCanvasClick(event) {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMeunu(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "newPaintJS";
    link.click();
}

function eraserInit() {
    erasing = false;
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    eraser.classList.remove("checked");
}

function handleEraserClick(event) {
    if (erasing === true) {
        erasing = false;
        filling = true;
        ctx.strokeStyle = INITIAL_COLOR;
        ctx.fillStyle = INITIAL_COLOR;
    } else {
        erasing = true;
        filling = false;
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
    }
    eraser.classList.toggle("checked");
}

function handleClearClick(event) {
    init();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMeunu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if (eraser) {
    eraser.addEventListener("click", handleEraserClick);
}

if (clear) {
    clear.addEventListener("click", handleClearClick);
}