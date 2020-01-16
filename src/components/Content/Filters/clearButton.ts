import {h} from 'effector-dom';
import classes from 'todomvc-app-css/index.css';
import * as todos from '../../../models/todos';

export interface IClearButton {
  (): void
}

export const ClearButton = () => {
  h('button', {
    attr: {class: classes["clear-completed"]},
    text: 'Clear completed',
    handler: {click: todos.clearCompleted}
  });
};
