const grid = document.querySelector('.grid')
const GRIDWIDTH = 960
const DIMENSION = 20
const BOXWIDTH = (100/DIMENSION).toString() + "%"

grid.style.width = (GRIDWIDTH).toString() + 'px'
grid.style.height = (GRIDWIDTH).toString() + 'px'
grid.style.gridTemplateColumns = `repeat(${DIMENSION}, 1fr)`
grid.style.gridTemplateRows = `repeat(${DIMENSION}, 1fr)`

for (let i = 0; i < DIMENSION**2; i++) {
    let box = document.createElement('div')
    box.classList.add('box')
    box.addEventListener('mouseenter', hoverEffect)

    let innerbox = document.createElement('div')
    innerbox.classList.add('innerbox')
   
    box.appendChild(innerbox)
    grid.appendChild(box)
}

const BoxArray = document.querySelectorAll('.box')
const innerBoxArray = document.querySelectorAll('.innerbox')

function hoverEffect(e) {
    e.target.children[0].animate([
        {offset: 0.5, backgroundColor: 'white'},
        {offset: 0.5, border: '1px solid blue'},
        {offset: 0.5, transform: 'translateX(-3px) translateY(-3px)'},
        {offset: 0.99, transform: 'translateY(0px)'},
    ], {
        duration: 2000
    }) 
    e.target.animate([
        {offset: 0.5, backgroundColor: 'black'},
        {offset: 0.99, opacity: '0.01'},
    ], {
        duration: 2000
    }) 
}