import Board from './board';
import { PriorityQueue } from './data_structures';
window.PriorityQueue = PriorityQueue;

import BFS from './search/bfs';
import Dijkstra from './search/dijkstra';
window.Dijkstra = Dijkstra;
window.BFS = BFS;

document.addEventListener('DOMContentLoaded', ()=> {
  const stage = new createjs.Stage('main-canvas');
  const board = new Board(stage);
  board.init();
  const bfs = new BFS(board);
  // const path = bfs.run();
  // console.log(path);
  window.board = board;
});
