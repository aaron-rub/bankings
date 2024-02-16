const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const attendanceData = [];

app.post('/logAttendance', (req, res) => {
    const { name, startTime, endTime, elapsedMinutes } = req.body;
    attendanceData.push({ name, startTime, endTime, elapsedMinutes });
    console.log(`Attendance logged: ${name}`);
    res.sendStatus(200);
});

app.get('/getActiveTimers', (req, res) => {
    const activeTimers = attendanceData.filter(entry => !entry.endTime);
    res.json(activeTimers);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
