const grid = document.getElementById('grid');
const min = Math.min(grid.clientHeight, grid.clientWidth);
const rows = 32;
const cols = 32;
const boxSize = Math.floor(min / rows);


function createGrid(x, y) {
    let html = '';
    const size = x * y;
    for (let i = 0; i < size; i++) {
        html += `<div class="box grid-${i}"></div>`;
    }

    grid.innerHTML = html;
    grid.style.gridTemplateColumns = `repeat(${y}, auto)`;
}

function getColor() {
    const r = Math.round(Math.random() * 255) ;
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const o = Math.round(Math.random() * 10) / 10;
    return `rgb(${r}, ${g}, ${b}, ${o})`;
}

createGrid(rows, cols);

const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.style.cssText = `width: ${boxSize}px; height: ${boxSize}px;`;
    box.addEventListener('mouseover', e => {
        const box = e.target;
        box.style.backgroundColor = getColor();
    });
});