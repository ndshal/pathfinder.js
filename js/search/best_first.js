import Search from './search';
import { PriorityQueue } from '../data_structures';

class BestFirst extends Search {
  initializeFrontier() {
    this.frontier = new PriorityQueue();
    super.initializeFrontier();
  }

  processNeighbors(current) {
    if (typeof current === 'object') current = current.item;
    this.board.neighbors(current).forEach(
      function(neighbor) {
        if (!(neighbor in this.cameFrom)) {
          const type = this.board.grid[neighbor].type;
          if (type !== 'obstacle') {
            const priority = this.euclidean(neighbor, this.board.goal);

            this.frontier.insert(neighbor, priority);
            this.cameFrom[neighbor] = current;
            this.board.grid[neighbor].setType('frontier');
          }}
        }.bind(this)
      );
  }
}

export default BestFirst;
