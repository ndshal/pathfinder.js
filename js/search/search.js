class Search {
  constructor(board) {
    this.cameFrom = {};
    this.cameFrom[board.start] = null;

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

  updateCameFrom(node, parent) {
    const nodeCoords = [
      Math.floor(node.easelCell.x/10),
      Math.floor(node.easelCell.y/10),
    ];
    const parentCoords = [
      Math.floor(parent.easelCell.x/10),
      Math.floor(parent.easelCell.y/10),
    ];

    this.cameFrom[nodeCoords] = parentCoords;
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
