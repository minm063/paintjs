const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // canvas context
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = document.getElementsByClassName("canvas")[0].offsetWidth;
const CANVAS_HEIGHT = document.getElementsByClassName("canvas")[0].offsetHeight;
// give size to pixel modifier
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 1.5;

let painting = false;
let filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // path is a line, if path made -> move path to (x,y)
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
        // ctx.closePath();
    }
}
function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
// function onMouseDown(event){
//     painting = true;
// }
function onMouseUp(event){
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
// 마우스 우클릭 금지
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/png"); // default : png
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if (range){
    range.addEventListener("input", handleRangeChange);
}
if (mode){
    mode.addEventListener("click", handleModeClick);
}
if (saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}