* {
    box-sizing: border-box;
    touch-action: manipulation;
}

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0D0D0D;
    color: #FFFFFF;
}

.container {
    width: 100%;
    max-width: 350px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.timer-box {
    width: 100%;
    padding: 15px;
    background-color: #0D0D0D;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

h1 {
    font-size: 3em;
    margin: 0 0 0px 0;
}

#timer {
    font-size: 4.4em;
    margin: 10px 0;
}

.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.time-controls, .timer-controls {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 5px;
    width: 100%;
}

button {
    margin: 3px;
    padding: 8px 12px;
    font-size: 0.9em;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    color: #FFFFFF;
}

.time-controls button {
    background-color: #1A1A1A;
    flex: 1;
}

.timer-controls button {
    background-color: #262626;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.timer-controls #cancel,
.timer-controls #start {
    flex: 1;
    max-width: 30%;
}

.timer-controls #repeat {
    flex: 2;
    max-width: 40%;
}

button:hover:not(:disabled) {
    background-color: #333333;
}

button:disabled {
    background-color: #1A1A1A;
    color: #666666;
    cursor: not-allowed;
    opacity: 0.7;
}

@media (max-width: 400px) {
    .container {
        padding: 5px;
    }

    .timer-box {
        padding: 10px;
    }

    #timer {4.4em;
    }

    button {
        font-size: 0.8em;
        padding: 7px 10px;
    }

    h1 {
        font-size: 3em;
    }
}
