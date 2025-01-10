// Initialize variables
let focusTime = 90 * 60; // Default focus time in seconds (90 minutes)
let breakTime = 10 * 60; // Default break time in seconds (10 minutes)
let focusTimer, breakTimer;
let isFocusActive = false;
let isBreakActive = false;
let focusStartTime = 0;
let breakStartTime = 0;
let sessionLog = []; // Store session logs in memory

// Elements
const timeDisplay = document.getElementById('timeDisplay');
const startFocusButton = document.getElementById('startFocusButton');
const startBreakButton = document.getElementById('startBreakButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const clearLogButton = document.getElementById('clearLogButton');
const downloadButton = document.getElementById('downloadButton');
const focusTimeInput = document.getElementById('focusTime');
const breakTimeInput = document.getElementById('breakTime');

// Function to format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Update the timer display
function updateTimer() {
    let currentTime;
    if (isFocusActive) {
        currentTime = Math.floor((Date.now() - focusStartTime) / 1000);
        if (currentTime >= focusTime) {
            stopFocus();
        }
    } else if (isBreakActive) {
        currentTime = Math.floor((Date.now() - breakStartTime) / 1000);
        if (currentTime >= breakTime) {
            stopBreak();
        }
    }
    timeDisplay.textContent = formatTime(currentTime);
}

// Start Focus Timer
startFocusButton.addEventListener('click', function() {
    focusTime = parseInt(focusTimeInput.value) * 60;
    breakTime = parseInt(breakTimeInput.value) * 60;
    isFocusActive = true;
    focusStartTime = Date.now();
    stopButton.disabled = false;
    resetButton.disabled = false;
    startFocusButton.disabled = true;
    startBreakButton.disabled = true;
    updateTimer();
    focusTimer = setInterval(updateTimer, 1000);
});

// Start Break Timer
startBreakButton.addEventListener('click', function() {
    isBreakActive = true;
    breakStartTime = Date.now();
    stopButton.disabled = false;
    resetButton.disabled = false;
    startFocusButton.disabled = true;
    startBreakButton.disabled = true;
    updateTimer();
    breakTimer = setInterval(updateTimer, 1000);
});

// Stop Timer
stopButton.addEventListener('click', function() {
    if (isFocusActive) {
        stopFocus();
    } else if (isBreakActive) {
        stopBreak();
    }
});

// Stop Focus Timer
function stopFocus() {
    clearInterval(focusTimer);
    isFocusActive = false;
    const focusedTime = ((Date.now() - focusStartTime) / 1000) / 60; // Convert to minutes
    saveSessionLog(focusedTime, 0); // 0 for break time
    startFocusButton.disabled = false;
    startBreakButton.disabled = false;
}

// Stop Break Timer
function stopBreak() {
    clearInterval(breakTimer);
    isBreakActive = false;
    const breakDuration = ((Date.now() - breakStartTime) / 1000) / 60; // Convert to minutes
    saveSessionLog(0, breakDuration); // 0 for focus time
    startFocusButton.disabled = false;
    startBreakButton.disabled = false;
}

// Save session log in memory
function saveSessionLog(focusTime, breakTime) {
    let logEntry;
    if (focusTime > 0) {  
        logEntry = {
            date: new Date().toLocaleDateString(),
            startTime: new Date(focusStartTime).toLocaleTimeString(),
            endTime: new Date().toLocaleTimeString(),
            focusTime: focusTime.toFixed(2), // Round to 2 decimal places
        };   
    } else {
        logEntry = {
            date: new Date().toLocaleDateString(),
            startTime: new Date(breakStartTime).toLocaleTimeString(),
            endTime: new Date().toLocaleTimeString(),
            breakTime: breakTime.toFixed(2), // Round to 2 decimal places
        };
    }
    sessionLog.push(logEntry);
    localStorage.setItem('sessionLog', JSON.stringify(sessionLog)); // Save to localStorage
}

// Clear session log
clearLogButton.addEventListener('click', function() {
    sessionLog = [];
    localStorage.removeItem('sessionLog');
});

// Download session log as JSON
downloadButton.addEventListener('click', function() {
    const logData = JSON.stringify(sessionLog, null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'session_log.json';
    a.click();
});

// Reset Timer
resetButton.addEventListener('click', function() {
    clearInterval(focusTimer);
    clearInterval(breakTimer);
    timeDisplay.textContent = '00:00';
    stopButton.disabled = true;
    resetButton.disabled = true;
    startFocusButton.disabled = false;
    startBreakButton.disabled = false;
});

// toggleTheme function
function toggleTheme() {
    // toggle style filter: invert property to html element
    document.documentElement.style.filter = document.documentElement.style.filter ? '' : 'invert(1)';
}