const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');
const thiefNum = document.querySelector('.num-title');
const caughtNum = document.querySelector('.num-caught');
const movesNum = document.querySelector('.num-moves');
const scoreNum = document.querySelector('.num-score');
const allDisc = document.querySelectorAll('.disc');
const guide = document.querySelector('.guide');
const gameStatus = document.querySelector('.game-status')
const restart = document.querySelector('.btn-restart');

let gameActive = false;

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    restartBtn.style.display = 'flex';
    startGame();
});

restart.addEventListener('click', () => {
    startGame();
})

restartBtn.addEventListener('click', () => {
    startGame();
});

function startGame() {
    restart.classList.add('hidden');
    gameStatus.textContent = '';
    guide.classList.remove('hidden');
    gameActive = true;
    setBoardZero();
    setRoom();
    removeSelection();
    addRandomThief();
    setupDiscListeners();
    setBoardDesc();
}

// Reset all counters
function setBoardZero() {
    scoreNum.textContent = 0;
    movesNum.textContent = 7;
    caughtNum.textContent = 0;
    thiefNum.textContent = 5;
}

const setBoardDesc = function () {
    guide.innerHTML = `<strong>Daring Heist:</strong> Hotel Raid is an exciting detective - style game where you play as a sharp-witted police officer tracking down five elusive  thieves hiding in a mysterious 15 - room hotel.Each thief is hidden in a separate room, and it’s up to you to raid the right ones, follow clues, and bring them to justice. Think fast, raid smart — the city is counting on you!
        <br> <br>
            <strong>
                🎯 Are you sharp enough?
            </strong>`;
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
        disc.textContent = "Oops..";
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

        setGameMessage("won");
    } else if (moves === 0) {
        // Add 'js-room' class to all discs that have 'thief' class but not 'thief-room'
        document.querySelectorAll('.disc').forEach(disc => {
            if (disc.classList.contains('thief') && !disc.classList.contains('thief-room')) {
                disc.classList.add('js-room');
                disc.textContent = "Thief !!";
            }
        });
        setGameMessage("lost");

    }
}

function setGameMessage(status) {
    gameActive = false;

    guide.classList.add('hidden');
    restart.classList.remove('hidden');

    document.querySelectorAll('.disc').forEach(disc => {
        disc.classList.remove('game-started');
    });

    const winMessages = [
        "Case closed! All 5 thieves are behind bars! 🚔🔒",
        "You nailed it, detective! Justice has been served! 🕵️‍♀️⚖️",
        "All suspects apprehended — you're the hero of the force! 🏅",
        "Flawless operation. The city sleeps safe tonight. 🌃💼",
        "Mission complete! You outsmarted them all! 🧠🚨",
        "Crime doesn't pay — especially when you're on the case! 🕶️",
        "Nice work, sleuth! Not a single thief escaped! 🔍🏆",
        "You just taught those crooks a lesson they won’t forget. 🎓💥",
        "The station's proud of you! Time to celebrate! 🎉🥳"
    ];

    const lostMessages = [
        "The thieves got away this time... but they won't next round! 🚨",
        "You're close, detective! They're slipping, but not for long. 🕵️‍♂️",
        "Even the best miss a case. Regroup and try again! 🗺️",
        "They outsmarted you this round — time to outsmart them! 🧠",
        "Almost had them! One more try and those crooks are toast! 🔍",
        "You're learning their tricks... next time, they'll slip up! 🧤",
        "Take a breather, dust off your badge, and try again! 💨",
        "They may have escaped, but your comeback will be legendary! 🏅"
    ];

    gameStatus.textContent = (status === 'won')
        ? winMessages[Math.floor(Math.random() * winMessages.length)]
        : lostMessages[Math.floor(Math.random() * lostMessages.length)];


}