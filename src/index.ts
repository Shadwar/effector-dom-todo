import '@babel/polyfill'
import {using, h, spec} from 'effector-dom';
import {Title} from './components/Title';
import {Content} from './components/Content';
import classes from 'todomvc-app-css/index.css';
import './models/model';

using(document.body, () => {
  h('div', () => {
    spec({
      data: {root: true},
      attr: {class: classes.todoapp},
    });

    Title();
    Content();
  });
})
