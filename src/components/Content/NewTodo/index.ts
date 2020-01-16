import {createEvent, forward} from 'effector';
import {h, spec, node} from 'effector-dom';
import {ToggleAllButton} from './toggleAllButton';
import * as todos from '../../../models/todos';
import './module.scss';

export interface INewTodo {
  (): void;
}

export const NewTodo: INewTodo = () => {
  h('header', () => {
    h('section', () => {
      h('input', () => {
        const keypress = createEvent<KeyboardEvent>();
        const submit = keypress.filter({ fn: e => e.key === 'Enter' });

        node((node: HTMLInputElement) => {
          submit.watch(() => {
            if (node.value !== '') node.value = '';
          });

          forward({
            from: submit.filterMap(() => node.value !== '' ? ({ title: node.value, completed: false }) : undefined),
            to: todos.appended,
          });
        });

        spec({
          data: {newTodo: 'input'},
          attr: {type: 'text', autoFocus: true},
          handler: {keypress}
        });
      });
    });

    ToggleAllButton();
  });
};
