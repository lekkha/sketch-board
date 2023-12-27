let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont"); 
let optionsFlag = true; 

optionsCont.addEventListener("click", (e) => {
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
}