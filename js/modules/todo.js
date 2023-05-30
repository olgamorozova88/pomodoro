import { createElement} from './utils.js';
import { state } from './state.js';
import { stop, changeActiveStatus } from './control.js';

const todoList = document.querySelector('.todo__list');
const todoTitle = document.querySelector('.title');
const pomodoroCount = document.querySelector('.count_num');

const getTodoList = () => {
  const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');
  return todoList;
}

const saveTodo = (todo) => {
  const todoList = getTodoList();
  todoList.push(todo);
  localStorage.setItem('pomodoro', JSON.stringify(todoList));
}

const updateTodo = (todo) => {
  const todoList = getTodoList();
  if (!todoList.length) {
    return;
  }
  const todoItem = todoList.find((item) => item.id === todo.id);
  todoItem.title = todo.title;
  todoItem.pomodoro = todo.pomodoro;
  localStorage.setItem('pomodoro', JSON.stringify(todoList));
}

const deleteTodo = (todo) => {
  const todoList = getTodoList();
  const newTodoList = todoList.filter((item) => item.id !== todo.id);
  state.activeTask = newTodoList[newTodoList.length - 1];
  localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
}

const showCurrentTodo = () => {
  if (state.activeTask) {
    todoTitle.textContent = '';
    todoTitle.textContent = state.activeTask.title;
    pomodoroCount.textContent = state.activeTask.pomodoro;
  } else {
    todoTitle.textContent = '';
    pomodoroCount.textContent = 0;
  }
}

const createTodo = (todo) => {
  const newTodo = createElement('li', 'todo__item', null, false);
  const todoWrapper = createElement('div', 'todo__item-wrapper', null, false);
  const todoBtn = createElement('button', 'todo__btn', todo.title, false);
  const todoEdit = createElement('button', 'todo__edit', 'Редактировать', true);
  const todoDelete = createElement('button', 'todo__del', 'Удалить', true);
  todoBtn.addEventListener('click', () => {
    stop();
    changeActiveStatus('work');
    state.activeTask = todo;
    showCurrentTodo();
  });
  todoEdit.addEventListener('click', () => {
    todo.title = prompt('Введите текст задачи', todo.title);
    todoBtn.textContent = todo.title;
    showCurrentTodo();
    updateTodo(todo);
  });
  todoDelete.addEventListener('click', () => {
    deleteTodo(todo);
    newTodo.remove();
    showCurrentTodo();
  });
  todoWrapper.append(todoBtn, todoEdit, todoDelete);
  newTodo.append(todoWrapper);
  todoList.prepend(newTodo);
}

const addTodo = (title) => {
  const todo = {
    id: Math.random().toString(16).substring(2,8),
    pomodoro: 0,
    title,
  };
  createTodo(todo);
  saveTodo(todo);
  showCurrentTodo();
}

const renderTodoList = (list) => {
  todoList.textContent = '';
  list.forEach(createTodo);
}

const initTodoList = () => {
  const todoList = getTodoList();
  if (!todoList.length) {
    state.activeTask = {
      id: 'default',
      pomodoro: 0,
      title: '',
    }
  } else {
    state.activeTask = todoList[0];
  }
  showCurrentTodo();
  renderTodoList(todoList);
}

export { initTodoList, addTodo, showCurrentTodo, updateTodo }