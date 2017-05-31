import Board from './board';
import { PriorityQueue } from './data_structures';
window.PriorityQueue = PriorityQueue;

import BFS from './search/bfs';
window.BFS = BFS;

document.addEventListener('DOMContentLoaded', ()=> {
  const stage = new createjs.Stage('main-canvas');
  const board = new Board(stage);
  board.init();
  window.board = board;
});
