let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;

const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        paused = false;
    }
}

function pauseStopwatch() {
    if (running && !paused) {
        clearInterval(tInterval);
        paused = true;
    } else if (running && paused) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        paused = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    display.innerHTML = "00 : 00 : 00 : 000";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "00" + milliseconds : milliseconds;

    display.innerHTML = hours + " : " + minutes + " : " + seconds + " : " + milliseconds;
}