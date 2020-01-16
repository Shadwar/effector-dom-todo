import {h, list, spec} from 'effector-dom';
import classes from 'todomvc-app-css/index.css'
import * as todos from '../../../models/todos';
import {TodoItem} from './TodoItem';

export interface ITodoList {
  (): void;
}

export const TodoList: ITodoList = () => {
  h('section', () => {
    spec({attr: {class: classes.main}});

    h('ul', () => {
      spec({attr: {class: classes["todo-list"]}});
      list(todos.$filteredList, TodoItem);
    });
  });
}