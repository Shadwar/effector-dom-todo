import {Store} from 'effector';
import {h, spec, map} from 'effector-dom';
import classes from 'todomvc-app-css/index.css'
import * as todos from '../../../../models/todos';

export interface ITodoItem {
  ({store, index}: {store: Store<todos.TodoItem>, index: number}): void;
}

export const TodoItem: ITodoItem = ({store, index}) => {
  store.watch(console.log);
  h('li', () => {
    h('div', () => {
      spec({attr: {class: classes.view}});

      h('input', {
        attr: {type: 'checkbox', class: classes.toggle, checked: store.map(item => item.completed)},
        handler: {click: todos.toggled.prepend((e: MouseEvent) => index)}
      });

      h('label', {text: store.map(item => item.title)});

      h('button', {
        attr: {class: classes.destroy},
        handler: {click: todos.removed.prepend((e: MouseEvent) => index)},
      });
    })
  });
}