import Board from './board';

document.addEventListener('DOMContentLoaded', ()=> {
  window.createjs = createjs;

  const stage = new createjs.Stage('main-canvas');
  const board = new Board(stage);
  window.board = board;
});
