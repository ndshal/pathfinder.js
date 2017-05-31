import Search from './search';
import { PriorityQueue } from '../data_structures';

class Dijkstra extends Search {
  initializeFrontier() {
    this.frontier = new PriorityQueue();
    this.costSoFar = {};
    this.costSoFar[this.board.start] = 0;

    this.processNeighbors(this.board.start);
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        const type = this.board.grid[neighbor].type;
        const cost = type === 'obstacle' ? 100 : 0;
        const newCost = this.costSoFar[current] + cost;

        if (!(neighbor in this.costSoFar) ||
            newCost < this.costSoFar[neighbor]) {
            this.frontier.insert(neighbor, newCost);
            this.cameFrom[neighbor] = current;
            this.costSoFar[neighbor] = newCost;
            this.board.grid[neighbor].setType('frontier');
          }
        }.bind(this)
      );
  }
}

export default Dijkstra;
