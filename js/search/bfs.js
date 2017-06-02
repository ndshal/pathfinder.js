import Search from './search';
import { Queue } from '../data_structures';

class BFS extends Search {
  initializeFrontier() {
    this.frontier = new Queue();
    super.initializeFrontier();
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        if (!(neighbor in this.cameFrom)) {
          const type = this.board.grid[neighbor].type;
          if (type !== 'obstacle') {
            this.frontier.enqueue(neighbor);
            this.cameFrom[neighbor] = current;
            this.board.grid[neighbor].setType('frontier');
          }
        }
      }.bind(this)
    );
  }
}

export default BFS;
