import View from './view';
import State from './state';
import Log from './log';

const state = new State();
const log = new Log(state);
const view = new View(state);

if (process.env.NODE_ENV === 'development') {
  window.state = state;
}

view.render();
