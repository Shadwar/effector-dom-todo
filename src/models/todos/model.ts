import { $list, $filteredList, appended, toggleAll, removed, toggle, clearCompleted } from './index';
import * as filters from '../filters';
import { sample, merge, combine } from 'effector';

$list
  .on(toggle, (state, index) => state.map((item, i) => i === index ? ({...item, completed: !item.completed}) : item))
  .on(toggleAll, state => state.map(todo => todo.completed ? todo : ({...todo, completed: true})))
  .on(appended, (state, item) => [...state, item])
  .on(removed,  (state, index) => state.slice(0, index).concat(state.slice(index+1)))
  .on(clearCompleted, state => state.filter(item => !item.completed));


sample({
  source: combine([$list, filters.$active]),
  clock: merge([filters.$active.updates, $list.updates]),
  target: $filteredList,
  fn: ([list, filter]) => {
    let compareFn = (item) => true;

    if (filter === filters.FilterType.active) {
      compareFn = item => item.completed === false;
    } else if (filter === filters.FilterType.complete) {
      compareFn = item => item.completed === true;
    }

    return list.filter(compareFn);
  }
})