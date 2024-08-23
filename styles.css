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
const addMinuteButton = document.getElementById('addMinute');
const subMinuteButton = document.getElementById('subMinute');
const addSecondsButton = document.getElementById('addSeconds');
const subSecondsButton = document.getElementById('subSeconds');

function updateDisplay() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;

    if (hours > 0) {
        timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    if (isRunning && timeLeft <= 20) {
        timerDisplay.style.color = '#D94A4A';
        messageDisplay.textContent = 'Preparate para la siguiente serie';
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
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
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
    alert('¡Tiempo terminado!');
    resetColors();
    updateRepeatButton();
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
    resetColors();
    updateRepeatButton();
}

function resetColors() {
    timerDisplay.style.color = '#FFFFFF';
    messageDisplay.textContent = 'Descansa';
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

function addMinute() {
    timeLeft += 60;
    totalTime += 60;
    updateDisplay();
    actionButton.disabled = false;
    cancelResetButton.disabled = false;
    updateRepeatButton();
}

function subMinute() {
    if (timeLeft >= 60) {
        timeLeft -= 60;
        totalTime = Math.max(totalTime - 60, 0);
    } else {
        timeLeft = 0;
        totalTime = 0;
    }
    updateDisplay();
    checkTimerStatus();
    updateRepeatButton();
}

function addSeconds() {
    timeLeft += 30;
    totalTime += 30;
    updateDisplay();
    actionButton.disabled = false;
    cancelResetButton.disabled = false;
    updateRepeatButton();
}

function subSeconds() {
    if (timeLeft >= 30) {
        timeLeft -= 30;
        totalTime = Math.max(totalTime - 30, 0);
    } else {
        timeLeft = 0;
        totalTime = 0;
    }
    updateDisplay();
    checkTimerStatus();
    updateRepeatButton();
}

function checkTimerStatus() {
    if (timeLeft === 0) {
        if (isRunning) {
            finishTimer();
        } else {
            actionButton.disabled = true;
            cancelResetButton.textContent = 'Reiniciar';
            isCancelMode = false;
        }
    }
}

function updateRepeatButton() {
    repeatButton.disabled = totalTime === 0;
    if (totalTime > 0) {
        let hours = Math.floor(totalTime / 3600);
        let minutes = Math.floor((totalTime % 3600) / 60);
        let seconds = totalTime % 60;
        let timeString = "";
        if (hours > 0) {
            timeString += `${hours}h `;
        }
        if (minutes > 0) {
            timeString += `${minutes}min `;
        }
        if (seconds > 0) {
            timeString += `${seconds}seg`;
        }
        repeatButton.textContent = `Repetir ${timeString.trim()}`;
    } else {
        repeatButton.textContent = 'Repetir último';
    }
    cancelResetButton.disabled = totalTime === 0 && isCancelMode;
}

actionButton.addEventListener('click', startPauseResumeTimer);
cancelResetButton.addEventListener('click', function() {
    if (isCancelMode) {
        cancelTimer();
    } else {
        timeLeft = 0;
        totalTime = 0;
        updateDisplay();
        cancelResetButton.textContent = 'Cancelar';
        isCancelMode = true;
        updateRepeatButton();
    }
});
repeatButton.addEventListener('click', repeatLastTimer);
addMinuteButton.addEventListener('click', addMinute);
subMinuteButton.addEventListener('click', subMinute);
addSecondsButton.addEventListener('click', addSeconds);
subSecondsButton.addEventListener('click', subSeconds);

updateDisplay();
actionButton.disabled = true;
cancelResetButton.disabled = true;
repeatButton.disabled = true;
updateRepeatButton();
