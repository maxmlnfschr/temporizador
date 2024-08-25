let timer;
let timeLeft = 0;
let lastTime = 0;
let totalTime = 0;
let lastAddedTime = 0;
let isRunning = false;
let isPaused = false;
let hasStartedOnce = false;
let isCancelMode = true;
const MAX_TIME = 480;

const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const actionButton = document.getElementById('start');
const cancelResetButton = document.getElementById('cancel');
const repeatButton = document.getElementById('repeat');
const add30SecondsButton = document.getElementById('add30Seconds');
const add1MinuteButton = document.getElementById('add1Minute');

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (isRunning) {
        if (timeLeft <= 10) {
            timerDisplay.style.color = '#D94A4A';
            messageDisplay.textContent = 'Preparate';
        } else {
            timerDisplay.style.color = '#FFFFFF';
            messageDisplay.textContent = 'Descansa';
        }
    } else {
        timerDisplay.style.color = '#FFFFFF';
        messageDisplay.textContent = 'Descansa';
    }
}

function startPauseResumeTimer() {
    if (!isRunning && !isPaused) {
        if (timeLeft > 0) {
            isRunning = true;
            hasStartedOnce = true;
            totalTime = timeLeft;
            startTimer();
            actionButton.textContent = 'Pausar';
            updateRepeatButton();
        }
    } else if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        isPaused = true;
        actionButton.textContent = 'Reanudar';
    } else if (isPaused) {
        isRunning = true;
        isPaused = false;
        startTimer();
        actionButton.textContent = 'Pausar';
    }
    updateDisplay();
    updateButtonStates();
    saveState();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
            saveState();
        } else {
            finishTimer();
        }
    }, 1000);
}

function finishTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    actionButton.textContent = 'Iniciar';
    actionButton.disabled = true;
    timerDisplay.style.color = '#FFFFFF';
    updateButtonStates();
    updateRepeatButton();
    saveState();
}

function cancelTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    timeLeft = 0;
    updateDisplay();
    actionButton.textContent = 'Iniciar';
    actionButton.disabled = true;
    cancelResetButton.textContent = 'Reiniciar';
    isCancelMode = false;
    updateButtonStates();
    saveState();
}

function repeatLastTimer() {
    if (lastAddedTime > 0) {
        clearInterval(timer);
        isRunning = true;
        isPaused = false;
        timeLeft = Math.min(lastAddedTime, MAX_TIME);
        updateDisplay();
        actionButton.textContent = 'Pausar';
        actionButton.disabled = false;
        updateButtonStates();
        startTimer();
        saveState();
    }
}

function addTime(seconds) {
    let newTime = timeLeft + seconds;
    if (newTime <= MAX_TIME) {
        timeLeft = newTime;
        lastAddedTime = newTime;
    } else {
        timeLeft = MAX_TIME;
        lastAddedTime = MAX_TIME;
    }
    updateDisplay();
    updateButtonStates();
    updateRepeatButton();
    saveState();
}

function updateButtonStates() {
    actionButton.disabled = timeLeft === 0;
    if (timeLeft > 0) {
        cancelResetButton.textContent = 'Cancelar';
        cancelResetButton.disabled = false;
        isCancelMode = true;
    } else if (lastAddedTime > 0) {
        cancelResetButton.textContent = 'Reiniciar';
        cancelResetButton.disabled = false;
        isCancelMode = false;
    } else {
        cancelResetButton.textContent = 'Cancelar';
        cancelResetButton.disabled = true;
        isCancelMode = true;
    }
    updateRepeatButtonState();
    add30SecondsButton.disabled = timeLeft >= MAX_TIME;
    add1MinuteButton.disabled = timeLeft >= MAX_TIME - 30;
}

function updateRepeatButtonState() {
    repeatButton.disabled = lastAddedTime === 0;
}

function updateRepeatButton() {
    if (lastAddedTime > 0) {
        let minutes = Math.floor(lastAddedTime / 60);
        let seconds = lastAddedTime % 60;
        repeatButton.textContent = `+${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        repeatButton.textContent = 'Repetir';
    }
}

function saveState() {
    localStorage.setItem('timerState', JSON.stringify({
        timeLeft,
        totalTime,
        lastAddedTime,
        isRunning,
        isPaused,
        hasStartedOnce,
        isCancelMode,
        lastSaved: Date.now()
    }));
}

function loadState() {
    const savedState = JSON.parse(localStorage.getItem('timerState'));
    if (savedState) {
        const timePassed = Math.floor((Date.now() - savedState.lastSaved) / 1000);
        timeLeft = Math.max(0, savedState.timeLeft - (savedState.isRunning ? timePassed : 0));
        totalTime = savedState.totalTime;
        lastAddedTime = savedState.lastAddedTime || 0;
        isRunning = savedState.isRunning;
        isPaused = savedState.isPaused;
        hasStartedOnce = savedState.hasStartedOnce;
        isCancelMode = savedState.isCancelMode;

        updateDisplay();
        updateButtonStates();
        updateRepeatButton();
        if (isRunning) {
            startTimer();
        }
    }
}

actionButton.addEventListener('click', startPauseResumeTimer);
cancelResetButton.addEventListener('click', function() {
    if (isCancelMode) {
        cancelTimer();
    } else {
        timeLeft = 0;
        totalTime = 0;
        lastAddedTime = 0;
        updateDisplay();
        updateButtonStates();
        updateRepeatButton();
        saveState();
    }
});
repeatButton.addEventListener('click', repeatLastTimer);
add30SecondsButton.addEventListener('click', () => addTime(30));
add1MinuteButton.addEventListener('click', () => addTime(60));

loadState();
if (!isRunning && !isPaused) {
    updateButtonStates();
    updateRepeatButton();
}
