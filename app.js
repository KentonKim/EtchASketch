const grid = document.querySelector('.grid');
const buttonErase = document.querySelector('#bttn__updategrid');
let DIMENSION = document.querySelector('#size__input').value;
const BOXWIDTH = (100/DIMENSION).toString() + "%";
const colorArray = ['#CC99C9', '#9EC1CF', '#9EE09E', '#FDFD97', '#FEB144','#bae1ff', '#FF6663'];
let brushColor = 'random'
let effectColor = 'white'
let mouseDown = 0;

grid.style.gridTemplateColumns = `repeat(${DIMENSION}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${DIMENSION}, 1fr)`;
buttonErase.addEventListener('click', eraseGrid)

document.body.onmousedown = function() { 
  mouseDown = 1;
}
document.body.onmouseleave= function() { 
  mouseDown = 0;
}
document.body.onmouseup = function() {
  mouseDown = 0;
}

for (let i = 0; i < DIMENSION**2; i++) {
    let box = document.createElement('div');
    box.classList.add('box');

    let innerbox = document.createElement('div');
    innerbox.classList.add('innerbox', 'hidden');
    innerbox.style.backgroundColor = 'white';
    box.addEventListener('click', rippleEvent);
    box.addEventListener('mousedown', fillColorEvent);
    box.addEventListener('mouseenter', hoverEvent);
    box.addEventListener('mouseenter', fillColorEvent);
    box.innerHTML = i.toString()
    innerbox.innerHTML = i.toString()
  
    box.appendChild(innerbox);
    grid.appendChild(box);
}

const BoxArray = document.querySelectorAll('.box');
const innerBoxArray = document.querySelectorAll('.innerbox');

function hoverEvent(e) {
    hoverEffect(e.target,150);
}

function fillColorEvent(e) {
    let startBox = Array.prototype.indexOf.call(BoxArray, e.target);
    if (startBox == -1) {
        startBox = Array.prototype.indexOf.call(innerBoxArray, e.target);
    }
    if (e.type == "mousedown") {
        fillColorEffect(BoxArray[startBox],brushColor);
    }
    else if (e.type == "mouseenter" && mouseDown) {
        fillColorEffect(BoxArray[startBox],brushColor);
    }
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
    let startBox = Array.prototype.indexOf.call(BoxArray, e.target);
    if (startBox == -1) {
        startBox = Array.prototype.indexOf.call(innerBoxArray, e.target);
    }
    //corner(startBox,'n');
    //corner(startBox,'e');
    corner(startBox,'s');
    corner(startBox,'w');

    function animate(targ) {
        if (targ.classList.contains('hidden')){
            targ.classList.remove('hidden');
            setTimeout(() => {
                targ.classList.add('hidden');
            }, RIPPlE_DURATION);
        }
    }

    function corner(number,direction){
        if (number >=0 && number < DIMENSION**2) {
            animate(innerBoxArray[number]);
        }
        if (direction == 'n'){
            straight(number,'nw');
            straight(number,'ne');
            if (number % DIMENSION != 0 && number >= 0){
                setTimeout(() => {
                    corner(number-DIMENSION-1,'n');
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 'e'){
            straight(number,'ne');
            straight(number,'se');
            if ((number+1) % DIMENSION != 0 && number >= 0){
                setTimeout(() => {
                corner(number-DIMENSION+1,'e');
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 's'){
            straight(number,'se');
            straight(number,'sw');
            if ((number+1) % DIMENSION != 0 && number < DIMENSION**2){
                setTimeout(() => {
                corner(number+DIMENSION+1,'s');
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 'w'){
            straight(number,'nw');
            straight(number,'sw');
            if (number % DIMENSION != 0 && number < DIMENSION**2){
                setTimeout(() => {
                    corner(number+DIMENSION-1,'w');
                }, RIPPlE_DURATION);
            }
        }
    }

    function straight(number,direction){
        if (number >= 0 && number < DIMENSION**2){
            animate(innerBoxArray[number]);
        }
        if (direction == 'nw' && number % DIMENSION !=0 && number-1 >=0) {
            setTimeout(() => {
                straight(number-1,'nw');
            }, RIPPlE_DURATION);
        }
        else if (direction == 'ne' && number >=0) {
            setTimeout(() => {
                straight(number-DIMENSION,'ne');
            }, RIPPlE_DURATION);
        }
        else if (direction == 'sw' && number < DIMENSION**2) {
            setTimeout(() => {
                straight(number+DIMENSION,'sw');
            }, RIPPlE_DURATION);
        }
        else if (direction == 'se' && (number+1) % DIMENSION !=0) {
            setTimeout(() => {
                straight(number+1,'se');
            }, RIPPlE_DURATION);
        }
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


function eraseGrid() {
    let eraseDelayMillisecond = 0
    for (let i = 0; i < DIMENSION**2; i++) {
        eraseDelayMillisecond += 1000/(DIMENSION**2) 
        setTimeout(() => {
            if (BoxArray[i].classList.contains('white')){
                BoxArray[i].classList.remove('white')
            }
            if (BoxArray[i].classList.contains('black')){
                BoxArray[i].classList.remove('black')
            }
            BoxArray[i].style.backgroundColor = 'transparent';
            if (BoxArray[i].classList.contains('animate')){
                BoxArray[i].classList.remove('animate')
            }
        }, eraseDelayMillisecond);
    }
}


