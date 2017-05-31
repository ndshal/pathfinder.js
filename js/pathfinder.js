import Board from './board';
import { PriorityQueue } from './data_structures';
window.PriorityQueue = PriorityQueue;

document.addEventListener('DOMContentLoaded', ()=> {
  const stage = new createjs.Stage('main-canvas');
  const board = new Board(stage);
  window.board = board;
});
