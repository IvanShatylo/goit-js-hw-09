import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let selectedTime = null;
const refs ={
    inputDate: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    body: document.querySelector('body'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            alert ('Please choose a date in the future');
            selectedDates[0] = new Date();
        } else {
            refs.btnStart.disabled = false;
            selectedTime = selectedDates[0];
        }
    },
  };

class Timer {
    constructor() {
        this.timerID = null;
        this.isActive = false;
        refs.btnStart.disabled = true;
    }

    startTimer() {

        if (this.isActive) {
        return;
        }

        this.isActive = true;
        this.timerID = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const componentsTimer = convertMs(deltaTime);
            this.updateTimer(componentsTimer);
            refs.btnStart.disabled = true;
            if (deltaTime <= 0 || deltaTime <= 1000) {
                clearInterval(this.timerID);
            }
        }, 1000);
    }

    updateTimer ({days, hours, minutes, seconds}) {
        refs.days.innerHTML = addLeadingZero(days);
        refs.hours.innerHTML = addLeadingZero(hours);
        refs.minutes.innerHTML = addLeadingZero(minutes);
        refs.seconds.innerHTML = addLeadingZero(seconds);
    }  
}

const timer = new Timer();

flatpickr(refs.inputDate, options);

refs.btnStart.addEventListener('click', () => timer.startTimer())

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart('2', 0);
  }