import { createEvent, restore } from 'effector';

export enum FilterType {
  all, active, complete
}

export const FilterLabel = {
  [FilterType.all]: 'All',
  [FilterType.active]: 'Active',
  [FilterType.complete]: 'Completed',
}

export const toggle = createEvent<FilterType>();

export const $active = restore(toggle, FilterType.all);
