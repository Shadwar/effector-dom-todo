import { createStore, combine, createEvent } from 'effector';

export type TodoItem = {
  title: string;
  completed: boolean;
};

export const $list = createStore([]);

export const $filteredList = createStore([]);

export const $count = $list.map(list => list.length);

export const $completedCount = $list.map(list => list.reduce((res, cur) => cur.completed ? res + 1 : res, 0));

export const $activeCount = combine($count, $completedCount, (count, completed) => count - completed);

export const toggle = createEvent<number>();

export const toggleAll = createEvent<any>();

export const appended = createEvent<TodoItem>();

export const removed = createEvent<number>();

export const clearCompleted = createEvent<any>();
