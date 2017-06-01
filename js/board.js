import graphNode from './graph_node';

class Board {
  constructor(stage) {
    this.stage = stage;
    this.grid = this.buildGrid();
    this.addListeners();
  }

  buildGrid() {
    let grid = {};

    for(let i = 0; i < Board.DIM_X; i += Board.dx){
      for(let j = 0; j < Board.DIM_Y; j += Board.dy){
        const node = new graphNode(i, j, Board.dx);
        grid[node.coords] = node;
        this.stage.addChild(node.easelCell);
      }
    }

    return grid;
  }

  addListeners() {
    this.stage.on('click', this.handleClick.bind(this));
    this.stage.on('pressmove', this.handleMouseMove.bind(this));
    this.stage.on('pressup', () => {
      this.handleMouseMove.prevCoords = null;
    });
  }

  init(start, goal) {
    if(!start) start = this._generateCoords();
    if(!goal) goal = this._generateCoords();

    this.setStart(start);
    this.setGoal(goal);
    createjs.Ticker.addEventListener('tick', this.stage);
  }

  handleClick(e) {
    const node = this.grid[this._getCoordsFromEvent(e)];
    node.toggleIsObstacle();
  }

  handleMouseMove(e) {
    const currCoords = this._getCoordsFromEvent(e);
    if (!this.grid[currCoords]) return false;

    const prevCoords = this.handleMouseMove.prevCoords;

    //only allow pressmove in discrete cells
    if(currCoords !== prevCoords) {
      if (this.start === prevCoords) {
        this.setStart(currCoords);
      } else if (this.goal === prevCoords) {
        this.setGoal(currCoords);
      } else {
        if (this.start !== currCoords && this.goal !== currCoords) {
          const node = this.grid[currCoords];
          node.toggleIsObstacle();
        }
      }

      this.handleMouseMove.prevCoords = currCoords;
    }
  }

  setStart(coords) {
    if(this.start) this.grid[this.start].setType('empty');
    this.start = coords;
    this.grid[coords].setType('start');
  }

  setGoal(coords) {
    if(this.goal) this.grid[this.goal].setType('empty');
    this.goal = coords;
    this.grid[coords].setType('goal');
  }

  _getCoordsFromEvent(e) {
    return [
      Math.floor(e.stageX/Board.dx)*Board.dx,
      Math.floor(e.stageY/Board.dx)*Board.dy,
    ].toString();
  }

  neighbors(coords) {
    const [x, y] = coords.split(',').map(str => parseInt(str));

    //array of coords that are neighbors
    let neighbors = [];
    for(let dx = -1; dx < 2; dx ++) {
      for(let dy = -1; dy < 2; dy ++) {
        if(dx === dy || dx === -dy) continue;

        const testCoords = [x + Board.dx*dx, y + Board.dy*dy].toString();
        if (this.grid[testCoords]) {
          neighbors.push(testCoords);
        }
      }
    }

    return neighbors;
  }

  clearSearch() {
    for(let coords in this.grid){
      this.grid[coords].reset();
    }
  }

  _generateCoords() {
    let x = Math.random()*Board.DIM_X;
    let y = Math.random()*Board.DIM_Y;
    x = Math.floor(x/Board.dx)*Board.dx;
    y = Math.floor(y/Board.dy)*Board.dy;
    return [x, y].toString();
  }
}

Board.dx = 10;
Board.dy = 10;
Board.DIM_X = 300; //pixels, not # gridpoints
Board.DIM_Y = 150;

export default Board;
