import {h, spec} from 'effector-dom';
import classes from 'todomvc-app-css/index.css';
import * as todos from '../../../models/todos';


export const ToggleAllButton = () => {
  h('section', () => {
    spec({data: {newTodo: 'toggleall'}});
    h('input', {attr: {class: classes["toggle-all"], type: 'checkbox'}});
    h('label', {handler: {click: todos.toggleAll}});
  });
};
