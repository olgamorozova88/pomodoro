import { startTimer, showTimeLeft } from './timer.js';
import { state } from './state.js';
import { stopAlarm } from './alarm.js';
import { addTodo } from './todo.js';

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');
const createTodoBtn = document.querySelector('.todo__add');
const pageTitle = document.title;

const changeActiveStatus = (status) => {
  state.status = status;
  for (let i = 0; i < navigationBtns.length; i++) {
    navigationBtns[i].dataset.use === status
    ? navigationBtns[i].classList.add('navigation__btn_active')
    : navigationBtns[i].classList.remove('navigation__btn_active');
  }
}

const start = () => {
  if (state.isActive) {
    btnStart.textContent = 'Старт';
    state.isActive = false;
    clearTimeout(state.timerId);
  } else {
    btnStart.textContent = 'Пауза';
    state.isActive = true;
    startTimer();
  }
}

const stop = () => {
  stopAlarm(state.status);
  btnStart.textContent = 'Старт';
  state.isActive = false;
  clearTimeout(state.timerId);
  state.timeLeft = state[state.status] * 60;
  showTimeLeft(state.timeLeft);
  document.title = pageTitle;
} 

const initControls = () => {
  showTimeLeft(state.timeLeft);
  btnStart.addEventListener('click', start);
  btnStop.addEventListener('click', stop);
  navigationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      changeActiveStatus(btn.dataset.use);
      showTimeLeft(state.timeLeft);
      stop();
    })
  });
  createTodoBtn.addEventListener('click', () => {
    const todoTitle = prompt('Введите текст задачи');
    if (todoTitle) {
      addTodo(todoTitle);
    } else {
      alert('Введите текст задачи!')
    }
  })
}

export { initControls, changeActiveStatus, stop };