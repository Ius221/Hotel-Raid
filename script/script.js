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
    setRoom();
    addRandomThief();
    checkThief();


    restartBtn.style.display = 'flex';
})

restartBtn.addEventListener('click', () => {
    setBoardZero();

    removeSelection();
    addRandomThief();



})

// Set all to zero
const setBoardZero = function () {
    noScore.textContent = 0;
    noMoves.textContent = 7;
    noCaught.textContent = 0;
    noTitle.textContent = 5;
}

// Set Rooms
const setRoom = function () {
    allDisc.forEach((room, ind) => {
        room.textContent = `Room ${ind + 1}`;
        room.classList.add('game-started')
    })
}

// place THIEF in random rooms
const addRandomThief = function () {
    i = 0;
    while (i < 5) {
        const randNo = Math.floor(Math.random() * 14);
        if (!allDisc[randNo].classList.contains('random-room')) {
            allDisc[randNo].classList.add('random-room');
            i++;
            console.log(randNo);
        }
    }
}

// remove selected room
const removeSelection = function () {
    allDisc.forEach((room) => {
        if (room.classList.contains('thief-room')) room.classList.remove('thief-room');
        if (room.classList.contains('blank-room')) room.classList.remove('blank-room');
    })
}

const checkThief = function () {
    allDisc.forEach((room) => {
        room.addEventListener('click', () => {
            if (room.classList.contains('random-room')) {
                room.classList.add('thief-room');
                room.textContent = "Caught!!";
            }
            else {
                room.classList.add('blank-room');
                room.textContent = "Oops!!";
            }
            console.log(room);
        })
    })
}