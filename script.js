let timer;
let timeLeft = 0;
let lastTime = 0;
let totalTime = 0;
let isRunning = false;
let isPaused = false;
let hasStartedOnce = false;
let isCancelMode = true;

const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const actionButton = document.getElementById('start');
const cancelResetButton = document.getElementById('cancel');
const repeatButton = document.getElementById('repeat');
const add30SecondsButton = document.getElementById('add30Seconds');
const add1MinuteButton = document.getElementById('add1Minute');
const add5MinutesButton = document.getElementById('add5Minutes');

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (isRunning) {
        const progress = ((totalTime - timeLeft) / totalTime) * 360;
        const progressColor = timeLeft <= 10 ? '#D94A4A' : '#4A90E2';
        document.querySelector('.timer-circle').style.setProperty('--progress', `${progress}deg`);
        document.querySelector('.timer-circle').style.setProperty('--progress-color', progressColor);
        
        if (timeLeft <= 10) {
            timerDisplay.style.color = '#D94A4A';
            messageDisplay.textContent = 'El descanso terminó... Prepárate';
        } else {
            timerDisplay.style.color = '#FFFFFF';
            messageDisplay.textContent = 'Descansa';
        }
    } else {
        document.querySelector('.timer-circle').style.setProperty('--progress', '0deg');
        document.querySelector('.timer-circle').style.setProperty('--progress-color', '#4A90E2');
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
    cancelResetButton.textContent = 'Reiniciar';
    isCancelMode = false;
    document.querySelector('.timer-circle').style.setProperty('--progress', '360deg');
    document.querySelector('.timer-circle').style.setProperty('--progress-color', '#D94A4A');
    timerDisplay.style.color = '#D94A4A';
    alert('¡Tiempo terminado!');
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
    updateRepeatButton();
    saveState();
}

function repeatLastTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    if (totalTime > 0) {
        timeLeft = totalTime;
        updateDisplay();
        actionButton.textContent = 'Pausar';
        actionButton.disabled = false;
        cancelResetButton.disabled = false;
        startPauseResumeTimer();
    }
}

function addTime(seconds) {
    timeLeft += seconds;
    totalTime = timeLeft;
    updateDisplay();
    updateButtonStates();
    saveState();
}

function updateButtonStates() {
    actionButton.disabled = timeLeft === 0;
    if (timeLeft > 0) {
        cancelResetButton.textContent = 'Cancelar';
        cancelResetButton.disabled = false;
        isCancelMode = true;
    } else {
        cancelResetButton.textContent = 'Reiniciar';
        cancelResetButton.disabled = true;
        isCancelMode = false;
    }
    updateRepeatButton();
}

function updateRepeatButton() {
    repeatButton.disabled = totalTime === 0;
    if (totalTime > 0) {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        repeatButton.textContent = `Repetir ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        repeatButton.textContent = 'Repetir último';
    }
}

function saveState() {
    localStorage.setItem('timerState', JSON.stringify({
        timeLeft,
        totalTime,
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
        isRunning = savedState.isRunning;
        isPaused = savedState.isPaused;
        hasStartedOnce = savedState.hasStartedOnce;
        isCancelMode = savedState.isCancelMode;

        updateDisplay();
        updateButtonStates();
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
        updateDisplay();
        updateButtonStates();
        saveState();
    }
});
repeatButton.addEventListener('click', repeatLastTimer);
add30SecondsButton.addEventListener('click', () => addTime(30));
add1MinuteButton.addEventListener('click', () => addTime(60));
add5MinutesButton.addEventListener('click', () => addTime(300));

loadState();
if (!isRunning && !isPaused) {
    updateButtonStates();
    repeatButton.disabled = totalTime === 0;
}
