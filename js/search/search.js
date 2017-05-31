import Path from '../path';

class Search {
  constructor(board) {
    this.cameFrom = {};
    this.cameFrom[board.start] = null;

    this.board = board;
  }

  run() {
    this.initializeFrontier();

    this.updateInterval = setInterval(
      () => {
        const current = this.frontier.dequeue();
        if(!current || current === this.board.goal) {
          clearInterval(this.updateInterval);
          new Path(this.buildPath(), this.board.stage)
        }

        this.processNeighbors(current);
        this.board.grid[current].setType('visited');
      },150);
  }

  oldRun() {
    this.initializeFrontier();

    while(!this.frontier.isEmpty()) {
      const current = this.frontier.dequeue();
      if (current === this.board.goal) break;

      this.processNeighbors(current);
      this.board.grid[current].setType('visited');
    }

    return this.buildPath();
  }

  buildPath() {
    if(!this.cameFrom[this.board.goal]) {
      return null;
    }

    let current = this.board.goal;
    let path = [];

    while(current) {
      path.unshift(current);
      current = this.cameFrom[current];
    }

    return path;
  }
}

export default Search;
