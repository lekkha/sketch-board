let canvas = document.querySelector("canvas"); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

let pencilColor = document.querySelectorAll(".pencil-color"); 
let pencilWidthElem = document.querySelector(".pencil-width"); 
let eraserWidthElem = document.querySelector(".eraser-width"); 
let download = document.querySelector(".download"); 
let redo = document.querySelector(".redo"); 
let undo = document.querySelector(".undo"); 

let penColor = "red"; 
let eraserColor = "white"; 
let penWidth = pencilWidthElem.value; 
let eraserWidth = eraserWidthElem.value;  

let undoRedoTracker = []; //Data 
let track = 0; // Represent which action form tracter array 

let mouseDown = false;

//API
let tool = canvas.getContext("2d"); 

tool.strokeStyle = penColor; 
tool.lineWidth = penWidth; 

//mouse-down -> start new path 
canvas.addEventListener("mousedown", (e) => {
    mouseDown = true; 
    // beginPath({
    //     x: e.clientX,
    //     y: e.clientY
    // })

    let data = {
        x: e.clientX,
        y: e.clientY
    }

    //sending data to server
    socket.emit("beginPath", data);
})
//mouse-move -> start drwaing
canvas.addEventListener("mousemove", (e) => {
    if(mouseDown){
    // drawStroke({
    //     x: e.clientX,
    //     y: e.clientY,
    //     //if eraserFlag is active then eraser color o/w penColor
    //     color: eraserFlag ? eraserColor : penColor, 
    //     width: eraserFlag ? eraserWidth : penWidth
    // }) 
        let data = {
            x: e.clientX,
            y: e.clientY,
            //if eraserFlag is active then eraser color o/w penColor
            color: eraserFlag ? eraserColor : penColor, 
            width: eraserFlag ? eraserWidth : penWidth
        }
        socket.emit("drawStroke", data);
    }
})

//mouse up -> drawing done
canvas.addEventListener("mouseup", (e) => {
    mouseDown = false; 

    let url = canvas.toDataURL(); 
    undoRedoTracker.push(url); 
    track = undoRedoTracker.length-1; 
})

undo.addEventListener("click", (e) => {
    if(track > 0) track--; 

    //track action 
    let data = {
        trackValue: track,
        undoRedoTracker 
    }
    socket.emit("redoUndo", data); 
})

redo.addEventListener("click", (e) => {
    if(track < undoRedoTracker.length-1) track++; 
    //action
    let data = {
        trackValue: track,
        undoRedoTracker 
    }
    // undoRedoCanvas(trackObj);   
    socket.emit("redoUndo", data);
})

function undoRedoCanvas(trackObj){
    track = trackObj.trackValue; 
    undoRedoTracker = trackObj.undoRedoTracker;
    //tracker has urls -> see mouseup

    let url = undoRedoTracker[track]; 
    let img = new Image(); //new image reference element
    img.src = url; 
    //event listener onload 
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height); 
    }

}

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

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();

    let a = document.createElement("a"); 
    a.href = url; 
    a.download = "board.jpg";
    a.click(); 
})

//making changes on screen after recieving dat from server
socket.on("beginPath", (data) => {
    //data form server
    beginPath(data); //calls function with new data
})

socket.on("drawStroke", (data) => {
    drawStroke(data); 
})

socket.on("redoUndo", (data) => {
    undoRedoCanvas(data); 
})

