import {NewTodo} from './NewTodo';
import {Filters} from './Filters';
import {TodoList} from './TodoList';


export interface IContent {
  (): void;
}

export const Content: IContent = () => {
  NewTodo();
  TodoList();
  Filters();
};
