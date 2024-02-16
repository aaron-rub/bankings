let startTime;
let timerInterval;

function logAttendance() {
    const name = document.getElementById("nameInput").value;
    const currentDate = new Date();
    startTime = currentDate.getTime();

    document.getElementById("login-container").style.display = "none";
    document.getElementById("timer-container").style.display = "block";

    document.getElementById("attendance-info").innerHTML = `Name: ${name}<br>Time: ${formatTime(currentDate)}`;

    startCountdownTimer();
}

function startCountdownTimer() {
    const targetTime = startTime + 8 * 60 * 1000; // 8 minutes countdown
    timerInterval = setInterval(function () {
        const currentTime = new Date().getTime();
        const remainingTime = targetTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            sendNotification();
        }

        document.getElementById("countdown-timer").innerHTML = `Countdown Timer: ${formatTime(new Date(remainingTime))}`;
    }, 1000);
}

function backInClass() {
    clearInterval(timerInterval);
    const endTime = new Date().getTime();
    const elapsedMinutes = (endTime - startTime) / (60 * 1000);

    const name = document.getElementById("nameInput").value;
    const currentDate = new Date();

    console.log(`Name: ${name}\nStart Time: ${formatTime(new Date(startTime))}\nEnd Time: ${formatTime(currentDate)}\nElapsed Time: ${elapsedMinutes.toFixed(2)} minutes`);

    // You can send the log data to the backend here (placeholder).

    // Reset the UI
    document.getElementById("timer-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("nameInput").value = "";
}

function sendNotification() {
    // Placeholder for sending a notification.
    console.log("Notification: You are late! The teacher has been notified.");
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
// ... (previous code)

function backInClass() {
    clearInterval(timerInterval);
    const endTime = new Date().getTime();
    const elapsedMinutes = (endTime - startTime) / (60 * 1000);

    const name = document.getElementById("nameInput").value;
    const currentDate = new Date();

    const attendanceData = {
        name,
        startTime,
        endTime,
        elapsedMinutes
    };

    fetch('http://localhost:3000/logAttendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    // Reset the UI
    document.getElementById("timer-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("nameInput").value = "";
}

// ... (remaining code)
