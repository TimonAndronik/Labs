// Clock
function displayTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerHTML = `${hours}:${minutes}:${seconds}`;
}

setInterval(displayTime, 1000);

// Timer
let timerInterval;

function startTimer() {
    const timerInput = document.getElementById('timer').value;
    const endTime = new Date(timerInput).getTime();

    timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = "Timer Expired";
        }
    }, 1000);
}

// Calendar
function displayCalendar() {
    const selectedDate = new Date(document.getElementById('month').value);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let calendarHTML = '<table>';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

    let date = new Date(firstDay);
    while (date <= lastDay) {
        calendarHTML += '<tr>';
        for (let i = 0; i < 7; i++) {
            if (date.getDay() === i && date.getMonth() === month) {
                calendarHTML += `<td>${date.getDate()}</td>`;
                date.setDate(date.getDate() + 1);
            } else {
                calendarHTML += '<td></td>';
            }
        }
        calendarHTML += '</tr>';
    }

    calendarHTML += '</table>';
    document.getElementById('calendar').innerHTML = calendarHTML;
}
function calculateTimeUntilBirthday() {
    const birthdayInput = document.getElementById('birthday').value;
    const birthday = new Date(birthdayInput);
    const now = new Date();
    birthday.setFullYear(now.getFullYear());
    if (now > birthday) {
        birthday.setFullYear(now.getFullYear() + 1);
    }
    const difference = birthday - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    document.getElementById('birthdayOutput').textContent = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

// Initial display
displayTime();
displayCalendar();
