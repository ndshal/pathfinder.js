import Search from './search';
import { PriorityQueue } from '../data_structures';

class Dijkstra extends Search {
  initializeFrontier() {
    this.frontier = new PriorityQueue();
    this.costSoFar = {};
    this.costSoFar[this.board.start] = 0;
    this.foundGoal = false;

    this.processNeighbors(this.board.start);
  }

  updateFrontier() {
    const current = this.frontier.deleteMin();
    this.processNeighbors(current);
    this.board.grid[current].setType('visited');
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        const type = this.board.grid[neighbor].type;
        const cost = type === 'obstacle' ? 100 : 0;
        const newCost = this.costSoFar[current] + cost;

        if (!(neighbor in this.cameFrom)) {
          if(type === 'empty') {
            this.frontier.insert(neighbor, 0);
            this.cameFrom[neighbor] = current;
            this.board.grid[neighbor].setType('frontier');
          } else if (type === 'goal'){
            this.cameFrom[neighbor] = current;
            this.foundGoal = true;
          }
        }
      }.bind(this)
    );
  }
}

export default Dijkstra;
