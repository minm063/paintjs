const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // canvas context
const colors = document.getElementsByClassName("jsColor");

// give size to pixel modifier
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 1.5;

let painting = false;
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
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))