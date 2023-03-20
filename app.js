const grid = document.querySelector('.grid');
const button = document.querySelector('#bttn__updategrid');
const GRIDWIDTH = 700;
const DIMENSION = 10;
const BOXWIDTH = (100/DIMENSION).toString() + "%";
const colorArray = ['#CC99C9', '#9EC1CF', '#9EE09E', '#FDFD97', '#FEB144','#bae1ff', '#FF6663'];
let brushColor = 'random'
let effectColor = 'white'
let mouseDown = 0;

grid.style.width = (GRIDWIDTH).toString() + 'px';
grid.style.height = (GRIDWIDTH).toString() + 'px';
grid.style.gridTemplateColumns = `repeat(${DIMENSION}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${DIMENSION}, 1fr)`;

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
    innerbox.classList.add('innerbox');
    innerbox.addEventListener('click', rippleEvent);
    innerbox.addEventListener('mousedown', fillColorEvent);
    innerbox.addEventListener('mouseenter', hoverEvent);
    innerbox.addEventListener('mouseenter', fillColorEvent);
  
    box.appendChild(innerbox);
    grid.appendChild(box);
}

const BoxArray = document.querySelectorAll('.box');
const innerBoxArray = document.querySelectorAll('.innerbox');

function hoverEvent(e) {
    hoverEffect(e.target,150);
}

function fillColorEvent(e) {
    if (e.type == "mousedown") {
        fillColorEffect(e.target,brushColor);
    }
    else if (e.type == "mouseenter" && mouseDown) {
        fillColorEffect(e.target,brushColor);
    }
}

function hoverEffect(targ,durationMillisecond) {
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

button.addEventListener('click',eraseGrid)

function eraseGrid() {
    let eraseDelayMillisecond = 0
    for (let i = 0; i < DIMENSION**2; i++) {
        eraseDelayMillisecond += 1000/(DIMENSION**2) 
        setTimeout(() => {
            innerBoxArray[i].style.backgroundColor = 'transparent';
            if (innerBoxArray[i].classList.contains('animate')){
                innerBoxArray[i].classList.remove('animate')
            }
        }, eraseDelayMillisecond);
    }
}

function rippleEvent(e) {
    let RIPPlE_DURATION = 80;
    let startNum = Array.prototype.indexOf.call(innerBoxArray, e.target);
    // tl, tr, bl, br
    let cornerArray = [startNum,startNum,startNum,startNum];
    let validCorners = 4;
    let validCornerArray = [1,1,1,1];
    let rippleDelayMillisecond = 0

    while (validCorners > 0) {
        for (let i = 0; i < 4; i++) {
            if (validCornerArray[i] == 1) {
                if (i == 0){
                    cornerArray[i] -= DIMENSION+1
                    if ((cornerArray[i]+1) % DIMENSION == 0 || cornerArray[i] < 0){
                        validCornerArray[i] = 0
                        validCorners -= 1
                    }            
                }
                else if (i == 1){
                    cornerArray[i] -= DIMENSION-1
                    if (cornerArray[i] % DIMENSION == 0 || cornerArray[i] < 0){
                        validCornerArray[i] = 0
                        validCorners -= 1
                    }
                }
                else if (i == 2){
                    cornerArray[i] += DIMENSION-1
                    if ((cornerArray[i]+1) % DIMENSION == 0 || cornerArray[i] >= DIMENSION**2){
                        validCornerArray[i] = 0
                        validCorners -= 1
                    }
                }
                else if (i == 3){
                    cornerArray[i] += DIMENSION+1
                    if (cornerArray[i] % DIMENSION == 0 || cornerArray[i] >= DIMENSION**2){
                        validCornerArray[i] = 0
                        validCorners -= 1
                    }
                }
            }
        }
        // 
        for (let i = 0; i < 5; i++) {
            if (validCornerArray[i] == 1){
                console.log(validCornerArray[i])
                console.log(cornerArray[i])
                hoverEffect(innerBoxArray[cornerArray[i]], 150)
            }
        }
    }
}

