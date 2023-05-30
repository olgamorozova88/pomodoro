import { alarmTimesUp } from './alarm.js';
import { state } from './state.js';
import { changeActiveStatus } from './control.js';
import { getValue } from './utils.js';
import { showCurrentTodo, updateTodo } from './todo.js';

const minutesShown = document.querySelector('.time__minutes');
const secondsShown = document.querySelector('.time__seconds');

const showTimeLeft = timeLeft => {
  const minutesLeft = Math.floor(state.timeLeft / 60);
  const secondsLeft = state.timeLeft % 60;
  minutesShown.textContent = getValue(minutesLeft);
  secondsShown.textContent = getValue(secondsLeft);
}

const startTimer = () => {
  state.timerId = setInterval(() => {
    if (state.status === 'work') {
      document.title = `Работаем: ${minutesShown.textContent}:${secondsShown.textContent}`;
    } else {
      document.title = `Отдыхаем: ${minutesShown.textContent}:${secondsShown.textContent}`;
    }
    state.timeLeft -= 1;
    showTimeLeft(state.timeLeft);
    if (state.timeLeft > 0 && state.isActive) {
      return;
    }

    clearTimeout(state.timerId);

    if (state.status === 'work') {
      state.activeTask.pomodoro++;
      updateTodo(state.activeTask);

      if (state.activeTask.pomodoro % state.pomodoroCount) {
        state.status = 'break';
      } else {
        state.status = 'relax';
      }
    } else {
      state.status = 'work'
    }
    state.timeLeft = state[state.status] * 60;
    changeActiveStatus(state.status);
    showCurrentTodo();
    startTimer();
    alarmTimesUp(state.status);
  }, 1000)
}

export { startTimer, showTimeLeft }