import View from './view';

document.addEventListener('DOMContentLoaded', ()=> {
  const stage = new createjs.Stage('main-canvas');
  const view = new View(stage);
  window.view = view;
});
