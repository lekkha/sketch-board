let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont"); 
let optionsFlag = true; 
let pencilToolCont = document.querySelector(".pencil-tool-cont"); 
let eraserToolsCont = document.querySelector(".eraser-tool-cont"); 
let pencil = document.querySelector(".pencil"); 
let eraser = document.querySelector(".eraser"); 
let pencilFlag = false; 
let eraserFlag = false; 


optionsCont.addEventListener("click", (e) => {
    // true -> tools show, false -> hide tools
    optionsFlag = !optionsFlag; 

    if(optionsFlag) openTools(); 
    else closeTools(); 
})

function openTools(){
    let iconElem = optionsCont.children[0]; //since only 1 children
    iconElem.classList.remove("fa-times"); 
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex"; 
}

function closeTools(){
    let iconElem = optionsCont.children[0]; 
    iconElem.classList.remove("fa-bars"); 
    iconElem.classList.add("fa-times");
    toolsCont.style.display = "none"; 

    pencilToolCont.style.display = "none"; 
    eraserToolsCont.style.display = "none"; 
}

pencil.addEventListener("click", (e) => {
    // true -> show pencil tool, false -> hide pencil tool
    pencilFlag = !pencilFlag; 
    if(pencilFlag) pencilToolCont.style.display = "block"; //no display mentioned in css
    else pencilToolCont.style.display = "none"; 
})

eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag; 
    if(eraserFlag) eraserToolsCont.style.display = "flex"; //flex display mentioned in css
    else eraserToolsCont.style.display = "none";
})

