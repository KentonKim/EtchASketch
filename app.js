const grid = document.querySelector('.grid')
const butt = document.querySelector('.button')
const GRIDWIDTH = 960
const DIMENSION = 10
const BOXWIDTH = (100/DIMENSION).toString() + "%"

grid.style.width = (GRIDWIDTH).toString() + 'px'
grid.style.height = (GRIDWIDTH).toString() + 'px'
grid.style.gridTemplateColumns = `repeat(${DIMENSION}, 1fr)`
grid.style.gridTemplateRows = `repeat(${DIMENSION}, 1fr)`

for (let i = 0; i < DIMENSION**2; i++) {
    let box = document.createElement('div')
    box.classList.add('box')

    let innerbox = document.createElement('div')
    innerbox.classList.add('innerbox')
    innerbox.addEventListener('mouseenter', hoverEvent)
    innerbox.addEventListener('click', rippleEvent)
  
    box.appendChild(innerbox)
    grid.appendChild(box)
}

const BoxArray = document.querySelectorAll('.box')
const innerBoxArray = document.querySelectorAll('.innerbox')

function hoverEvent(e) {
    hoverEffect(e.target)
}

function hoverEffect(targ) {
    let HOVER_DURATION = 200
    if (!targ.classList.contains('hovering')) {
        targ.classList.add('hovering')
        targ.animate([
            {offset: 0.5, backgroundColor: 'white'},
            // {offset: 0.5, transform: 'translateX(-3px) translateY(-3px)'},
            // {offset: 0.99, transform: 'translateY(0px)'},
        ], {
            duration: HOVER_DURATION 
        })
        setTimeout(() => {
            targ.classList.remove('hovering')
        }, HOVER_DURATION);
    }
}

function rippleEvent(e) {
    let RIPPlE_DURATION = 80
    let startNum = Array.prototype.indexOf.call(innerBoxArray, e.target);
    corner(startNum,'n')
    corner(startNum,'e')
    corner(startNum,'s')
    corner(startNum,'w')

    function corner(number,direction){
        if (number >=0 && number < DIMENSION**2) {
            hoverEffect(innerBoxArray[number])
        }
        if (direction == 'n'){
            straight(number,'nw')
            straight(number,'ne')
            if (number % DIMENSION != 0 && number >= 0){
                setTimeout(() => {
                    corner(number-DIMENSION-1,'n')
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 'e'){
            straight(number,'ne')
            straight(number,'se')
            if ((number+1) % DIMENSION != 0 && number >= 0){
                setTimeout(() => {
                corner(number-DIMENSION+1,'e')
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 's'){
            straight(number,'se')
            straight(number,'sw')
            if ((number+1) % DIMENSION != 0 && number < DIMENSION**2){
                setTimeout(() => {
                corner(number+DIMENSION+1,'s')
                }, RIPPlE_DURATION);
            }
        }
        else if (direction == 'w'){
            straight(number,'nw')
            straight(number,'sw')
            if (number % DIMENSION != 0 && number < DIMENSION**2){
                setTimeout(() => {
                    corner(number+DIMENSION-1,'w')
                }, RIPPlE_DURATION);
            }
        }
   }

    function straight(number,direction){
        if (number >= 0 && number < DIMENSION**2){
            hoverEffect(innerBoxArray[number])
        }
        if (direction == 'nw' && number % DIMENSION !=0 && number-1 >=0) {
            setTimeout(() => {
                straight(number-1,'nw')
            }, RIPPlE_DURATION);
        }
        else if (direction == 'ne' && number >=0) {
            setTimeout(() => {
                straight(number-DIMENSION,'ne')
            }, RIPPlE_DURATION);
        }
        else if (direction == 'sw' && number < DIMENSION**2) {
            setTimeout(() => {
                straight(number+DIMENSION,'sw')
            }, RIPPlE_DURATION);
        }
        else if (direction == 'se' && (number+1) % DIMENSION !=0) {
            setTimeout(() => {
                straight(number+1,'se')
            }, RIPPlE_DURATION);
        }
   }
}

butt.addEventListener('click', testfxn)
function testfxn() {
    for (i = 0; i < 400; i++) {
        setTimeout(() => {
            corner(i,'n') 
        }, 1000);
    }
}