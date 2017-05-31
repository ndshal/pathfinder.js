import Board from './board';
import { PriorityQueue } from './data_structures';
window.PriorityQueue = PriorityQueue;

import BFS from './search/bfs';
import Dijkstra from './search/dijkstra';
import BestFirst from './search/best_first'
window.Dijkstra = Dijkstra;
window.BFS = BFS;
window.BestFirst = BestFirst;

import Path from './path';
window.Path = Path;

document.addEventListener('DOMContentLoaded', ()=> {
  const stage = new createjs.Stage('main-canvas');
  const board = new Board(stage);
  board.init();
  const bfs = new BFS(board);
  // const path = bfs.run();
  // console.log(path);
  window.board = board;
});
