import View from './view';
import State from './state';

const state = new State();
const view = new View(state);
window.state = state;
view.render();