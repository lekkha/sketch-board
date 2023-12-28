let canvas = document.querySelector("canvas"); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

let pencilColor = document.querySelectorAll(".pencil-color"); 
let pencilWidthElem = document.querySelector(".pencil-width"); 
let eraserWidthElem = document.querySelector(".eraser-width"); 

let penColor = "red"; 
let eraserColor = "white"; 
let penWidth = pencilWidthElem.value; 
let eraserWidth = eraserWidthElem.value;  

let mouseDown = false;

//API
let tool = canvas.getContext("2d"); 

tool.strokeStyle = penColor; 
tool.lineWidth = penWidth; 

//mouse-down -> start new path 
canvas.addEventListener("mousedown", (e) => {
    mouseDown = true; 
    beginPath({
        x: e.clientX,
        y: e.clientY
    })
})
//mouse-move -> start drwaing
canvas.addEventListener("mousemove", (e) => {
    if(mouseDown){
        drawStroke({
            x: e.clientX,
            y: e.clientY,
            //if eraserFlag is active then eraser color o/w penColor
            color: eraserFlag ? eraserColor : penColor, 
            width: eraserFlag ? eraserWidth : penWidth
        }) 
    }
})
canvas.addEventListener("mouseup", (e) => {
    mouseDown = false; 
})

function beginPath(strokeObj){
    tool.beginPath(); 
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj){
    tool.strokeStyle = strokeObj.color; 
    tool.lineWidth = strokeObj.width; 
    tool.lineTo(strokeObj.x, strokeObj.y); 
    tool.stroke(); 
}

pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0]; 
        penColor = color
        // penColor = colorElem.classList[0];
        tool.strokeStyle = penColor; 
    })
})

pencilWidthElem.addEventListener("change", (e) =>{
    penWidth = pencilWidthElem.value; 
    tool.lineWidth = penWidth; 
})

eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value; 
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click", (e) => {
    if(eraserFlag){
        tool.strokeStyle = eraserColor; 
        tool.lineWidth = eraserWidth; 
    }
    //if flag off go back to pen values 
    else{
        tool.strokeStyle = penColor; 
        tool.lineWidth = penWidth;
    }
})

