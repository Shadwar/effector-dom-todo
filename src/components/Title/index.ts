import {h} from 'effector-dom';
import './module.scss';

export interface ITitle {
  (): void
}

export const Title: ITitle = () => {
  h('h1', {
    data: {title: true},
    text: 'todos',
  });  
}
