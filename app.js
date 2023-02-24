const gridDiv = document.querySelector('.grid')
const style = getComputedStyle(gridDiv, 'width')
const gridWidth = 960
const dimension = 20
const boxWidth = (100/dimension).toString() + "%"

gridDiv.style.width = (gridWidth).toString() + 'px'
gridDiv.style.height = (gridWidth).toString() + 'px'

for (let i = 0; i < dimension**2; i++) {
    let box = document.createElement('div')
    box.classList.add('box')
    box.style.width = boxWidth 
    box.style.height = boxWidth
    box.addEventListener('mouseenter', hoverEffect)

    let innerbox = document.createElement('div')
    innerbox.classList.add('innerbox')

    box.appendChild(innerbox)
    gridDiv.appendChild(box)
}

const BoxArray = document.querySelectorAll('.box')
const innerBoxArray = document.querySelectorAll('.innerbox')

function hoverEffect(e) {
    e.target.children[0].animate([
        {offset: 0.5, backgroundColor: 'skyblue'},
        {offset: 0.5, border: '1px solid blue'},
        {offset: 0.5, transform: 'translateX(-5px) translateY(-5px)'},
        {offset: 0.99, backgroundColor: 'rosybrown'},
        {offset: 0.99, transform: 'translateY(0px)'},
    ], {
        duration: 1000
    }) 
    e.target.animate([
        {offset: 0.5, backgroundColor: 'skyblue'},
        {offset: 0.99, backgroundColor: 'burlywood'},
    ], {
        duration: 1000
    }) 

}