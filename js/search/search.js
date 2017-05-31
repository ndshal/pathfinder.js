class Search {
  constructor(board) {
    this.cameFrom = {};
    this.cameFrom[board.start.gridCoords()] = null;

    this.board = board;
    this.goal = board.goal;
    this.start = board.start;
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
    if(!this.cameFrom[this.goal.gridCoords()]) {
      return null;
    }

    let current = this.goal.gridCoords();
    let path = [];

    while(current) {
      path.unshift(current);
      current = this.cameFrom[current];
    }

    return path;
  }
}

export default Search;
