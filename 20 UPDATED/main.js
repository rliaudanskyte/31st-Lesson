const gameBox = document.querySelector('#point');
const gameArea = document.querySelector('.gameArea');
const resultLine = document.querySelector('h3');
const bestTimeLine = document.querySelector('.bestTime');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
let timeStart = "";
let bestTime = '';


const gameStart = () => {
    timeStart = Date.now();
    gameBox.style.display = "block";
}

startBtn.addEventListener('click', () => {
    setTimeout(gameStart, 500);
});

gameBox.addEventListener('click', () => {
    setTimeout(gameStart, 500);
    let time = (Date.now() - timeStart)/1000;
    resultLine.textContent = `Tavo laikas: ${time}s`;
    
    if (bestTime === '') {
        bestTime = time;
        bestTimeLine.textContent = `Geriausias laikas: ${bestTime}s`;
    } else if(bestTime > time) {
        bestTime = time;
        bestTimeLine.textContent = `Geriausias laikas: ${bestTime}s`;
    }
    
    styleBox(time);
    gameBox.style.display = "none";
});

resetBtn.addEventListener('click', () => {
    timeStart = "";
    bestTime = "";
    resultLine.textContent = `Tavo laikas:`;
    bestTimeLine.textContent = `Geriausias laikas: `;
    gameBox.style.display = "none";
})

function styleBox(time) {
    let randomColor = Math.floor(Math.random() * 360);
    let randomSize = Math.floor(Math.random() * 170) + 30;
    let randomIndexX = Math.floor(Math.random() * 100);
    let randomIndexY = Math.floor(Math.random() * 100);

    gameArea.style.padding = `0 ${randomSize}px ${randomSize}px 0`;
    gameBox.style.top = `${randomIndexY}%`;
    gameBox.style.left = `${randomIndexX}%`;
    gameBox.style.width = `${randomSize}px`;
    gameBox.style.backgroundColor = `hsl(${randomColor}, 45%, 45%)`;

    if (time > 0.500 && time < 2) {
        let randIndex = Math.round(Math.random());
        if (randIndex === 0) {
            gameBox.style.borderRadius = '50%';
        } else {
            gameBox.style.borderRadius = '0%';
        }
    };
};