import Search from './search';
import { Queue } from '../data_structures';

class BFS extends Search {
  initializeFrontier() {
    this.frontier = new Queue();

    this.processNeighbors(this.board.start);
    this.foundGoal = false;
  }

  updateFrontier() {
    const current = this.frontier.dequeue();
    this.processNeighbors(current);
    this.board.grid[current].setType('visited');
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        if (!(neighbor in this.cameFrom)) {
          const type = this.board.grid[neighbor].type;
          if(type === 'empty') {
            this.frontier.enqueue(neighbor);
            this.cameFrom[neighbor] = current;
            this.board.grid[neighbor].setType('frontier');
          } else if (type === 'goal'){
            this.cameFrom[neighbor] = current;
            this.board.grid[neighbor].setType('visited');
            this.foundGoal = true;
          }
        }
      }.bind(this)
    );
  }
}

export default BFS;
