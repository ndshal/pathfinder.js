class Search {
  constructor(board) {
    this.cameFrom = {};
    this.cameFrom[board.start] = null;

    this.board = board;
    this.initializeFrontier();
  }

  run() {
    while(!this.foundGoal) {
      this.updateFrontier();
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
