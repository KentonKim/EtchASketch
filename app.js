const gridDiv = document.querySelector('.grid')
const style = getComputedStyle(gridDiv, 'width')
const gridWidth = 960
const dimension = 16
const boxWidth = (100/dimension).toString() + "%"

gridDiv.style.width = (gridWidth).toString() + 'px'
gridDiv.style.height = (gridWidth).toString() + 'px'

for (let i = 0; i < dimension**2; i++) {
    let box = document.createElement('div')
    box.classList.add('box')
    box.style.width = boxWidth 
    box.style.height = boxWidth

    let innerbox = document.createElement('div')
    innerbox.classList.add('innerbox')
    innerbox.addEventListener('mouseenter', hoverEffect)

    box.appendChild(innerbox)
    gridDiv.appendChild(box)
}


function hoverEffect(e) {
    console.log(e.target)
    e.target.animate([
        {offset: 0.5, backgroundColor: 'skyblue'},
        {offset: 0.99, backgroundColor: 'rosybrown'},
    ], {
        duration: 2000
    }) 
}
