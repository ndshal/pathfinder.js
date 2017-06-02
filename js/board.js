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

  init() {
    this.setupSimple();
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

  clearSearch() {
    for(let coords in this.grid){
      this.grid[coords].clearIfSearch();
    }
  }

  clearObstacles() {
    for(let coords in this.grid){
      this.grid[coords].clearIfObstacle();
    }
  }

  setupSimple() {
    this.clearObstacles();
    this.setStart(`${3*12},${11*12}`);
    this.setGoal(`${15*12},${1*12}`);
    for(let i = 7; i < 15; i ++){
      this.grid[`${i*12},${2*12}`].toggleIsObstacle();
    }
    for(let j = 3; j < 10; j++){
      this.grid[`${14*12},${j*12}`].toggleIsObstacle();
    }
  }

  setupMaze() {

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

  _getCoordsFromEvent(e) {
    return [
      Math.floor(e.stageX/Board.dx)*Board.dx,
      Math.floor(e.stageY/Board.dx)*Board.dy,
    ].toString();
  }

  _generateCoords() {
    let x = Math.random()*Board.DIM_X;
    let y = Math.random()*Board.DIM_Y;
    x = Math.floor(x/Board.dx)*Board.dx;
    y = Math.floor(y/Board.dy)*Board.dy;
    return [x, y].toString();
  }
}

Board.dx = 12;
Board.dy = 12;
Board.DIM_X = 290; //pixels, not # gridpoints
Board.DIM_Y = 145;

export default Board;
