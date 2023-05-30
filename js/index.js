import { initControls } from './modules/control.js';
import { initTodoList } from './modules/todo.js';


const init = () => {
  initControls();
  initTodoList();
}

init();
