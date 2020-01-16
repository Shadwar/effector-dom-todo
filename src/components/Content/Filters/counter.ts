import {h, spec} from 'effector-dom';
import { $activeCount } from '../../../models/todos';

export interface ICounter {
  (): void;
}

export const Counter: ICounter = () => {
  h('span', () => {
    spec({data: {filters: 'counter'}});

    h('strong', {text: $activeCount});
    h('span', {text: $activeCount.map(count => count === 1 ? ' item left' : ' items left')});
  });
}
