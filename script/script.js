const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const noTitle = document.querySelector('.num-title');
const noCaught = document.querySelector('.num-caught');
const noMoves = document.querySelector('.num-moves');
const noScore = document.querySelector('.num-score');
const allDisc = document.querySelectorAll('.disc');






/*****************************************************
*****************************************************/


startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";

    setBoardZero();
    allDisc.forEach((abc, ind) => {
        abc.textContent = `Room ${ind + 1}`;
    })








    restartBtn.style.display = 'flex';
})

restartBtn.addEventListener('click', () => {
    setBoardZero();



})

// Set all to zero
const setBoardZero = function () {
    noScore.textContent = 0;
    noMoves.textContent = 7;
    noCaught.textContent = 0;
    noTitle.textContent = 5;
}

// Set room to default
const setRoom = function () {

}