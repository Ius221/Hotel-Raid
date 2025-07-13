const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const thiefNum = document.querySelector('.num-title');
const caughtNum = document.querySelector('.num-caught');
const movesNum = document.querySelector('.num-moves');
const scoreNum = document.querySelector('.num-score');
const allDisc = document.querySelectorAll('.disc');

let gameActive = false;

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    restartBtn.style.display = 'flex';
    startGame();
});

restartBtn.addEventListener('click', () => {
    startGame();
});

function startGame() {
    gameActive = true;
    setBoardZero();
    setRoom();
    removeSelection();
    addRandomThief();
    setupDiscListeners();
}

// Reset all counters
function setBoardZero() {
    scoreNum.textContent = 0;
    movesNum.textContent = 7;
    caughtNum.textContent = 0;
    thiefNum.textContent = 5;
}

// Set room labels and base class
function setRoom() {
    document.querySelectorAll('.disc').forEach((room, ind) => {
        room.textContent = `Room ${ind + 1}`;
        room.classList.add('game-started');
    });
}

// Remove all game-related classes
function removeSelection() {
    document.querySelectorAll('.disc').forEach(room => {
        room.classList.remove('thief-room', 'blank-room', 'js-room', 'random-room', 'thief');
    });
}

// Place 5 thieves randomly
function addRandomThief() {
    const discs = Array.from(document.querySelectorAll('.disc'));
    let available = [...discs];
    for (let i = 0; i < 5; i++) {
        const idx = Math.floor(Math.random() * available.length);
        available[idx].classList.add('thief');
        available.splice(idx, 1);
    }
    console.log(discs, available);
}

// Set up click listeners, ensuring only one per disc
function setupDiscListeners() {
    document.querySelectorAll('.disc').forEach(disc => {
        // Remove all previous listeners by replacing node
        const newDisc = disc.cloneNode(true);
        disc.parentNode.replaceChild(newDisc, disc);
    });
    // Add new listeners
    document.querySelectorAll('.disc').forEach(disc => {
        disc.addEventListener('click', handleDiscClick, { once: true });
    });
}

function handleDiscClick(e) {
    if (!gameActive) return;
    const disc = e.currentTarget;
    let moves = parseInt(movesNum.textContent);
    let score = parseInt(scoreNum.textContent);
    let caught = parseInt(caughtNum.textContent);
    let thiefLeft = parseInt(thiefNum.textContent);

    if (disc.classList.contains('thief')) {
        disc.classList.add('thief-room');
        disc.textContent = "Caught!!";
        caught++;
        thiefLeft--;
        score += 15;
    } else {
        disc.classList.add('blank-room');
        disc.textContent = "Oops!!";
        score -= 2;
    }
    moves--;

    // Prevent negative values
    moves = Math.max(moves, 0);
    score = Math.max(score, 0);
    thiefLeft = Math.max(thiefLeft, 0);

    // Update UI
    movesNum.textContent = moves;
    scoreNum.textContent = score;
    caughtNum.textContent = caught;
    thiefNum.textContent = thiefLeft;

    // End game conditions
    if (thiefLeft === 0) {
        gameActive = false;
        setTimeout(() => alert('Congratulations! You caught all the thieves!'), 100);
    } else if (moves === 0) {
        gameActive = false;
        setTimeout(() => alert('Game Over! You ran out of moves.'), 100);
    }
}
