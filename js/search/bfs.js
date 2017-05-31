import Search from './search';
import { Queue } from '../data_structures';

class BFS extends Search {
  initializeFrontier() {
    this.frontier = new Queue();

    this.processNeighbors(this.board.start);
  }

  updateFrontier() {
    const current = this.frontier.dequeue();
    this.processNeighbors(current);
    this.board.grid[current].setType('visited');
  }

  processNeighbors(current) {
    for (let neighbor in this.board.neighbors(current)) {
      if (!(neighbor in this.cameFrom)) {
        this.frontier.enqueue(neighbor);
        this.cameFrom[neighbor] = current;
        this.board.grid[neighbor].setType('frontier');
      }
    }
  }
}

export default BFS;
