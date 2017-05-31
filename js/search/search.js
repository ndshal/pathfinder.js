class Search {
  constructor(board) {
    this.cameFrom = {};
    this.cameFrom[board.start] = null;

    this.board = board;
    this.goal = board.goal;
    this.initializeFrontier();
  }

  run() {
    while(!this.frontier.isEmpty()) {
      if(this.cameFrom[this.goal]) {
        break;
      }

      this.updateFrontier();
    }

    this.buildPath();
  }

  buildPath() {
    if(!this.cameFrom[this.goal]) {
      return null;
    }

    let current = this.goal;
    let path = [];

    while(current) {
      path.shift(current);
      current = this.cameFrom[current];
    }

    return path;
  }
}

export default Search;
