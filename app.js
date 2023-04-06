const grid = document.querySelector('.grid');
const buttonErase = document.querySelector('#bttn__updategrid');
const buttonSize = document.querySelector('#size__bttn');
const colorArray = ['#CC99C9', '#9EC1CF', '#9EE09E', '#FDFD97', '#FEB144','#bae1ff', '#FF6663'];
let dimension = parseInt(document.querySelector('#size__input').value);
let oldDimension = 0
let brushColor = 'random'
let effectColor = 'white'
let mouseDown = 0;
let BoxArray = [];
let innerBoxArray = [];

buttonErase.addEventListener('click', clearGrid)
buttonSize.addEventListener('click', initializeGrid)
initializeGrid();

document.body.onmousedown = function() { 
  mouseDown = 1;
}
document.body.onmouseleave= function() { 
  mouseDown = 0;
}
document.body.onmouseup = function() {
  mouseDown = 0;
}

function initializeGrid() {
    let delayMilliseccond = clearGrid()
    setTimeout(() => {
        dimension = parseInt(document.querySelector('#size__input').value);
        grid.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;

        if (dimension - oldDimension > 0) {
            for (let i = 0; i < dimension**2 - oldDimension**2; i++) {
                let box = document.createElement('div');
                box.classList.add('box');
                box.addEventListener('click', rippleEvent);
                box.addEventListener('mousedown', fillColorEvent);
                box.addEventListener('mouseenter', hoverEvent);
                box.addEventListener('mouseenter', fillColorEvent);

                let innerbox = document.createElement('div');
                innerbox.classList.add('innerbox', 'hidden');
                innerbox.style.backgroundColor = 'white';

                BoxArray.push(box)
                innerBoxArray.push(innerbox)

                box.appendChild(innerbox);
                grid.appendChild(box);
            }
        }
        else if (dimension - oldDimension < 0 ){
            for (let i = 0; i < oldDimension**2 - dimension**2; i++) {
                innerBoxArray.pop().remove()
                BoxArray.pop().remove()
            }
        }
            oldDimension = dimension
        let borderRadiusPixelNumber = (grid.offsetWidth/dimension)*0.1

        for (let j = 0; j < dimension**2; j++) {
            BoxArray[j].style.borderRadius = borderRadiusPixelNumber + "px";
            innerBoxArray[j].style.borderRadius = borderRadiusPixelNumber + "px";
        }

        grid.animate([
            {offset: 0.5, backgroundColor:"white"},
        ], {
            duration: 800
        })
    }, delayMilliseccond);
}

function clearGrid() {
    let eraseDelayMillisecond = 0
    let sidelength = BoxArray.length**0.5
    for (let i = 0; i < sidelength**2; i++) {
        eraseDelayMillisecond += 1000/(BoxArray.length) 
        setTimeout(() => {
            if (BoxArray[i].classList.contains('white')){
                BoxArray[i].classList.remove('white')
            }
            if (BoxArray[i].classList.contains('black')){
                BoxArray[i].classList.remove('black')
            }
            if (BoxArray[i].classList.contains('animate')){
                BoxArray[i].classList.remove('animate')
            }
            BoxArray[i].style.backgroundColor = 'gray';
        }, eraseDelayMillisecond);
    }
    return eraseDelayMillisecond
}

function getCellNumber(e) {
    let cellNum = Array.prototype.indexOf.call(BoxArray, e.target);
    if (cellNum == -1) {
        cellNum = Array.prototype.indexOf.call(innerBoxArray, e.target);
    }
    return cellNum
}

function fillColorEvent(e) {
    const startBox = getCellNumber(e)
    if (e.type == "mousedown") {
        fillColorEffect(BoxArray[startBox],brushColor);
    }
    else if (e.type == "mouseenter" && mouseDown) {
        fillColorEffect(BoxArray[startBox],brushColor);
    }
}

function hoverEvent(e) {
    hoverEffect(e.target,150);
}

function hoverEffect(targ, durationMillisecond = 150) {
    if (!targ.classList.contains('hovering')) {
        targ.classList.add('hovering');
        targ.animate([
            {offset: 0.5, backgroundColor: effectColor},
        ], {
            duration: durationMillisecond 
        });
        setTimeout(() => {
            targ.classList.remove('hovering');
        }, durationMillisecond);
    }
}

function rippleEvent(e, RIPPlE_DURATION = 80) {
    const startBox = getCellNumber(e)
    corner(startBox,'n');
    corner(startBox,'e');
    corner(startBox,'s');
    corner(startBox,'w');

    function corner(number,direction){
        if (number >=0 && number < dimension**2) {
            animate(innerBoxArray[number]);
        }
        if (direction == 'n'){
            straight(number,'nw');
            straight(number,'ne');
            if (number % dimension != 0 && number >= 0){
                setTimeout(() => {
                    corner(number-dimension-1,'n');
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 'e'){
            straight(number,'ne');
            straight(number,'se');
            if ((number+1) % dimension != 0 && number >= 0){
                setTimeout(() => {
                corner(number-dimension+1,'e');
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 's'){
            straight(number,'se');
            straight(number,'sw');
            if ((number+1) % dimension != 0 && number < dimension**2){
                setTimeout(() => {
                corner(number+dimension+1,'s');
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 'w'){
            straight(number,'nw');
            straight(number,'sw');
            if (number % dimension != 0 && number < dimension**2){
                setTimeout(() => {
                    corner(number+dimension-1,'w');
                }, RIPPlE_DURATION);
            }
        }
    }
}

function straight(number,direction, RIPPlE_DURATION=80){
    if (number >= 0 && number < dimension**2){
        animate(innerBoxArray[number]);
    }
    if (direction == 'nw' && number % dimension !=0 && number-1 >=0) {
        setTimeout(() => {
            straight(number-1,'nw');
        }, RIPPlE_DURATION);
    }
    else if (direction == 'ne' && number >=0) {
        setTimeout(() => {
            straight(number-dimension,'ne');
        }, RIPPlE_DURATION);
    }
    else if (direction == 'sw' && number < dimension**2) {
        setTimeout(() => {
            straight(number+dimension,'sw');
        }, RIPPlE_DURATION);
    }
    else if (direction == 'se' && (number+1) % dimension !=0) {
        setTimeout(() => {
            straight(number+1,'se');
        }, RIPPlE_DURATION);
    }
}

function animate(targ, RIPPlE_DURATION = 80) {
    if (targ.classList.contains('hidden')){
        targ.classList.remove('hidden');
        setTimeout(() => {
            targ.classList.add('hidden');
        }, RIPPlE_DURATION);
    }
}

function fillColorEffect(targ,color) {
    if (color == 'black') {
        targ.style.backgroundColor = "black";
    }
    else if (color == 'white') {
        targ.style.backgroundColor = "white";
    }
    else if (color == 'random') {
        /*
        let randomColor = Math.floor(Math.random() * 7);
        targ.style.backgroundColor = colorArray[randomColor];
        */
        if (targ.classList.contains('animate')) {
            targ.style.animation = "none"
            setTimeout(() => {
                targ.style.animation = ""
            }, 10);
        }
        else {
            targ.classList.add('animate');
        }
    }
}

function playSnake() {
    // Idle start animation

    // Event listener when keystroke is wasd

    // Controls

    // Random meal generation

    // Eating 
}