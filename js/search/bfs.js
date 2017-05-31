import Search from './search';
import { Queue } from '../data_structures';

class BFS extends Search {
  initializeFrontier() {
    this.frontier = new Queue();

    this.processNeighbors(this.start);
  }

  updateFrontier() {
    const current = this.frontier.dequeue();
    this.processNeighbors(current);
    this.board.grid[current].setType('visited');
  }

  processNeighbors(current) {
    let neighbors = this.board.neighbors(current);
    for(let i = 0; i < neighbors.length; i ++) {
      if(!(neighbors[i] in this.cameFrom)) {
        this.frontier.enqueue(neighbors[i]);
        this.cameFrom[neighbors[i]] = current;
        this.board.grid[neighbors[i]].setType('frontier')
      }
    }
  }
}

export default BFS;
