let timer;
let timeLeft = 0;
let lastTime = 0;
let isRunning = false;
let isPaused = false;
let hasStartedOnce = false;

const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const actionButton = document.getElementById('start');
const cancelButton = document.getElementById('reset');
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
        messageDisplay.textContent = 'Descansa...';
    }
}

function startPauseResumeTimer() {
    if (!isRunning && !isPaused) {
        if (timeLeft > 0) {
            isRunning = true;
            hasStartedOnce = true;
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
    cancelButton.disabled = true;
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
    cancelButton.disabled = true;
    resetColors();
    updateRepeatButton();
}

function resetColors() {
    timerDisplay.style.color = '#FFFFFF';
    messageDisplay.textContent = 'Descansa...';
}

function repeatLastTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    if (lastTime > 0) {
        timeLeft = lastTime;
        updateDisplay();
        actionButton.textContent = 'Iniciar';
        actionButton.disabled = false;
        cancelButton.disabled = false;
    }
}

function addMinute() {
    if (!isRunning && !isPaused) {
        timeLeft += 60;
        updateLastTime();
        updateDisplay();
        actionButton.disabled = false;
        cancelButton.disabled = false;
    }
}

function subMinute() {
    if (!isRunning && !isPaused && timeLeft >= 60) {
        timeLeft -= 60;
        updateLastTime();
        updateDisplay();
    }
    actionButton.disabled = timeLeft === 0;
    cancelButton.disabled = timeLeft === 0;
}

function addSeconds() {
    if (!isRunning && !isPaused) {
        timeLeft += 30;
        updateLastTime();
        updateDisplay();
        actionButton.disabled = false;
        cancelButton.disabled = false;
    }
}

function subSeconds() {
    if (!isRunning && !isPaused && timeLeft >= 30) {
        timeLeft -= 30;
        updateLastTime();
        updateDisplay();
    }
    actionButton.disabled = timeLeft === 0;
    cancelButton.disabled = timeLeft === 0;
}

function updateLastTime() {
    lastTime = timeLeft;
}

function updateRepeatButton() {
    if (hasStartedOnce && lastTime > 0) {
        repeatButton.style.display = 'inline-block';
        let hours = Math.floor(lastTime / 3600);
        let minutes = Math.floor((lastTime % 3600) / 60);
        let seconds = lastTime % 60;
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
        repeatButton.style.display = 'none';
    }
}

actionButton.addEventListener('click', startPauseResumeTimer);
cancelButton.addEventListener('click', cancelTimer);
repeatButton.addEventListener('click', repeatLastTimer);
addMinuteButton.addEventListener('click', addMinute);
subMinuteButton.addEventListener('click', subMinute);
addSecondsButton.addEventListener('click', addSeconds);
subSecondsButton.addEventListener('click', subSeconds);

// Inicialización
updateDisplay();
actionButton.disabled = true;
cancelButton.disabled = true;
updateRepeatButton();
