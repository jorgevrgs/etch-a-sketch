const input = document.getElementById('input');
const color = document.getElementById('color');
const black = document.getElementById('black');
const buttons = document.querySelectorAll('.buttons');

let mode = 'color';
color.classList.add('active');

// ░█▀▀▀ ░█─░█ ░█▄─░█ ░█▀▀█ ▀▀█▀▀ ▀█▀ ░█▀▀▀█ ░█▄─░█ ░█▀▀▀█ 
// ░█▀▀▀ ░█─░█ ░█░█░█ ░█─── ─░█── ░█─ ░█──░█ ░█░█░█ ─▀▀▀▄▄ 
// ░█─── ─▀▄▄▀ ░█──▀█ ░█▄▄█ ─░█── ▄█▄ ░█▄▄▄█ ░█──▀█ ░█▄▄▄█

function toggleButton() {
    color.classList.toggle('active');
    black.classList.toggle('active');
}

function getMatrixSize() {
    return input.value > 0 ? parseInt(input.value) : 16;
}

function createGrid() {
    const grid = document.getElementById('grid');
    const squareSize = Math.min(grid.clientHeight, grid.clientWidth) * 0.9;
    let matrixSize = getMatrixSize();

    const boxSize = Math.floor(squareSize / matrixSize);

    let html = '';
    const size = matrixSize ** 2;
    for (let i = 0; i < size; i++) {
        html += `<div class="box grid-${i}"></div>`;
    }

    grid.innerHTML = html;
    grid.style.width = squareSize;
    grid.style.height = squareSize;
    grid.style.gridTemplateColumns = `repeat(${matrixSize}, auto)`;

    // ░█▀▀▀ ░█──░█ ░█▀▀▀ ░█▄─░█ ▀▀█▀▀
    // ░█▀▀▀ ─░█░█─ ░█▀▀▀ ░█░█░█ ─░█──
    // ░█▄▄▄ ──▀▄▀─ ░█▄▄▄ ░█──▀█ ─░█──
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.style.cssText = `width: ${boxSize}px; height: ${boxSize}px;`;
        box.addEventListener('mouseover', e => {
            const box = e.target;
            box.style.backgroundColor = getColor(mode);
        });
    });
}

function getColor(mode = 'color') {
    switch (mode) {
        case 'black':
            return 'black';
        default:
            const r = Math.round(Math.random() * 255) ;
            const g = Math.round(Math.random() * 255);
            const b = Math.round(Math.random() * 255);
            const alpha = Math.round(Math.random() * 10) / 10;
            return `rgb(${r}, ${g}, ${b}, ${alpha})`;
    }
}


// ░█▀▀▀ ░█──░█ ░█▀▀▀ ░█▄─░█ ▀▀█▀▀ 　 ░█─── ▀█▀ ░█▀▀▀█ ▀▀█▀▀ ░█▀▀▀ ░█▄─░█ ░█▀▀▀ ░█▀▀█ 
// ░█▀▀▀ ─░█░█─ ░█▀▀▀ ░█░█░█ ─░█── 　 ░█─── ░█─ ─▀▀▀▄▄ ─░█── ░█▀▀▀ ░█░█░█ ░█▀▀▀ ░█▄▄▀ 
// ░█▄▄▄ ──▀▄▀─ ░█▄▄▄ ░█──▀█ ─░█── 　 ░█▄▄█ ▄█▄ ░█▄▄▄█ ─░█── ░█▄▄▄ ░█──▀█ ░█▄▄▄ ░█─░█

buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        const btn = e.target;
        if (mode !== btn.dataset.mode) {
            mode = btn.dataset.mode;
            toggleButton();
        }
    });
});

input.addEventListener('change', () => {
    createGrid();
});

createGrid();