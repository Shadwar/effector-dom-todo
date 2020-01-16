import {h, spec} from 'effector-dom';
import * as filters from '../../../models/filters';
import {Counter} from './counter';
import {FilterButton} from './filterButton';
import {ClearButton} from './clearButton';
import classes from 'todomvc-app-css/index.css'
import './module.scss';

export interface IFilters {
  (): void;
}

export const Filters: IFilters = () => {
  h('footer', () => {
    spec({data: {filters: 'root'}});
    Counter();

    h('ul', () => {
      spec({attr: {class: classes.filters}});
      FilterButton(filters.FilterType.all);
      FilterButton(filters.FilterType.active);
      FilterButton(filters.FilterType.complete);
    });

    ClearButton();
  })
};
