import {h, spec} from 'effector-dom';
import {FilterType, FilterLabel, $active, toggled} from '../../../models/filters';
import classes from 'todomvc-app-css/index.css';


export interface IFilterButton {
  (type: FilterType): void
}

export const FilterButton: IFilterButton = (type) => {
  h('li', () => {
    h('a', {
      data: {filters: 'button'},
      attr: {class: $active.map(active => active === type ? classes.selected : false)},
      text: FilterLabel[type],
      handler: {click: toggled.prepend((e: MouseEvent) => type)}
    });
  })
}