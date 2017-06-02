import graphNode from './graph_node';

class Board {
  constructor(stage) {
    this.stage = stage;

    this.resetDimensions();
    this.grid = this.buildGrid();
    this.addListeners();
  }

  resetDimensions(){
    this.DIM_X = this.stage.canvas.width;
    this.DIM_Y = this.stage.canvas.height;
    this.dx = 15;
    this.dy = 15;
  }

  buildGrid() {
    let grid = {};

    for(let i = 0; i < this.DIM_X; i += this.dx){
      for(let j = 0; j < this.DIM_Y; j += this.dy){
        const node = new graphNode(i, j, this.dx, this.dy);
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
    console.log(`${3*this.dx},${11*this.dy}`);
    this.setStart(`${3*this.dx},${11*this.dy}`);
    this.setGoal(`${10*this.dx},${1*this.dy}`);
    for(let i = 7; i < 15; i ++){
      this.grid[`${i*this.dx},${2*this.dy}`].toggleIsObstacle();
    }
    for(let j = 3; j < 10; j++){
      this.grid[`${14*this.dx},${j*this.dy}`].toggleIsObstacle();
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

        const testCoords = [x + this.dx*dx, y + this.dy*dy].toString();
        if (this.grid[testCoords]) {
          neighbors.push(testCoords);
        }
      }
    }

    return neighbors;
  }

  _getCoordsFromEvent(e) {
    return [
      Math.floor(e.stageX/this.dx)*this.dx,
      Math.floor(e.stageY/this.dx)*this.dy,
    ].toString();
  }

  _generateCoords() {
    let x = Math.random()*this.DIM_X;
    let y = Math.random()*this.DIM_Y;
    x = Math.floor(x/this.dx)*this.dx;
    y = Math.floor(y/this.dy)*this.dy;
    return [x, y].toString();
  }
}

Board.dx = 12;
Board.dy = 12;
Board.DIM_X = 290; //pixels, not # gridpoints
Board.DIM_Y = 145;

export default Board;
