import { sample, merge, createStore, combine, createEvent } from 'effector';
import * as filters from '../filters';

export type TodoItem = {
  title: string;
  completed: boolean;
};

export const $list = createStore<TodoItem[]>([]);

export const $filteredList = createStore<TodoItem[]>([]);

export const $count = $list.map(list => list.length);

export const $completedCount = $list.map(list => list.reduce((res, cur) => cur.completed ? res + 1 : res, 0));

export const $activeCount = combine($count, $completedCount, (count, completed) => count - completed);

export const toggled = createEvent<number>();

export const allToggled = createEvent<any>();

export const appended = createEvent<string>();

export const removed = createEvent<number>();

export const clearCompleted = createEvent<any>();

$list
  .on(toggled, (state, index) => state.map((item, i) => i === index ? ({...item, completed: !item.completed}) : item))
  .on(allToggled, state => state.map(todo => todo.completed ? todo : ({...todo, completed: true})))
  .on(appended, (state, title) => [...state, {title, completed: false}])
  .on(removed,  (state, index) => state.slice(0, index).concat(state.slice(index+1)))
  .on(clearCompleted, state => state.filter(item => !item.completed));

sample({
  source: combine([$list, filters.$active]),
  clock: merge([filters.$active.updates, $list.updates]),
  target: $filteredList,
  fn: ([list, filter]) => {
    let compareFn = (item: TodoItem) => true;

    if (filter === filters.FilterType.active) {
      compareFn = item => item.completed === false;
    } else if (filter === filters.FilterType.complete) {
      compareFn = item => item.completed === true;
    }

    return list.filter(compareFn);
  }
})