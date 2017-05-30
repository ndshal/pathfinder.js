import Cell from './cell';
window.Cell = Cell;

class Board {
  constructor(stage) {
    this.stage = stage;
    createjs.Ticker.addEventListener('tick', this.stage)

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.grid = this.drawGrid();
  }

  handleClick(e) {
    const currX = Math.floor(e.stageX/10)*10;
    const currY = Math.floor(e.stageY/10)*10;


    const gridX = Math.floor(e.stageX/10);
    const gridY = Math.floor(e.stageY/10);
    const cell = this.grid[gridX][gridY];
    if(this.start === cell || this.goal === cell) {
      return false;
    }

    cell.toggleIsObstacle();
    return true;
  }

  handleMouseMove(e) {
    const currX = Math.floor(e.stageX/10)*10;
    const currY = Math.floor(e.stageY/10)*10;
    const prevX = this.handleMouseMove.prevX;
    const prevY = this.handleMouseMove.prevY;

    //only allow pressmove in discrete cells
    if (currX !== prevX || currY !== prevY) {
        const cell = this.grid[currX/10][currY/10];

        if (this.isStart(prevX, prevY)) {
          this.setStart(cell);
        } else if (this.isGoal(prevX, prevY)) {
          this.setGoal(cell);
        } else {
          cell.toggleIsObstacle();
        }

        this.handleMouseMove.prevX = currX;
        this.handleMouseMove.prevY = currY;
    }
  }

  isStart(x, y) {
    return x === this.start.easelCell.x && y === this.start.easelCell.y;
  }

  isGoal(x, y) {
    return x === this.goal.easelCell.x && y === this.goal.easelCell.y;
  }

  setStart(cell) {
    if(this.start) {
      this.start.fillByString('empty');
    }

    cell.fillByString('start');
    this.start = cell;
  }

  setGoal(cell) {
    if(this.goal) {
      this.goal.fillByString('empty');
    }
    cell.fillByString('goal');
    this.goal = cell;
  }

  drawGrid() {
    let grid = [];

    for(let i = 0; i < 15; i ++ ){
      grid.push([]);

      for(let j = 0; j < 15; j ++){
        const cell = new Cell(i*10, j*10);
        this.stage.addChild(cell.easelCell);
        grid[i].push(cell);
      }
    }

    this.setStart(grid[10][11]);
    this.setGoal(grid[1][7]);

    this.stage.on('click', this.handleClick)
    this.stage.on('pressmove', this.handleMouseMove);
    this.stage.on('pressup', () => {
      this.handleMouseMove.prevX = null;
      this.handleMouseMove.prevY = null;
    });

    return grid;
  }
}

export default Board;
