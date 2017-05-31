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
    current.fillByString('visited');
  }

  processNeighbors(node) {
    let neighbors = this.board.neighbors(node);
    for(let i = 0; i < neighbors.length; i ++) {
      if(!(neighbors[i].gridCoords() in this.cameFrom)) {
        this.frontier.enqueue(neighbors[i]);
        neighbors[i].fillByString('frontier');
        this.cameFrom[neighbors[i].gridCoords()] = node.gridCoords();
      }
    }
  }
}

export default BFS;
