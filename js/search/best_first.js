import Search from './search';
import { PriorityQueue } from '../data_structures';

class BestFirst extends Search {
  initializeFrontier() {
    this.frontier = new PriorityQueue();

    this.processNeighbors(this.board.start);
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        if (!(neighbor in this.cameFrom)) {
          const type = this.board.grid[neighbor].type;
          if (type !== 'obstacle') {
            const priority = this.manhattan(neighbor, this.board.goal);

            this.frontier.insert(neighbor, priority);
            this.cameFrom[neighbor] = current;
            this.board.grid[neighbor].setType('frontier');
          }}
        }.bind(this)
      );
  }

  manhattan(coords1, coords2) {
    const [x1, y1] = coords1.split(',').map(s => parseInt(s));
    const [x2, y2] = coords2.split(',').map(s => parseInt(s));

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
}

export default BestFirst;
