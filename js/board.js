import graphNode from './graph_node';

class Board {
  constructor(stage) {
    this.stage = stage;
    createjs.Ticker.addEventListener('tick', this.stage)

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.grid = this.drawGrid();
  }

  handleClick(e) {
    const gridX = Math.floor(e.stageX/10);
    const gridY = Math.floor(e.stageY/10);
    const node = this.grid[gridX][gridY];
    if(this.start === node || this.goal === node) {
      return false;
    }

    node.toggleIsObstacle();
    return true;
  }

  handleMouseMove(e) {
    const currX = Math.floor(e.stageX/10)*10;
    const currY = Math.floor(e.stageY/10)*10;
    const prevX = this.handleMouseMove.prevX;
    const prevY = this.handleMouseMove.prevY;

    //only allow pressmove in discrete cells
    if (currX !== prevX || currY !== prevY) {
        const node = this.grid[currX/10][currY/10];

        if (this.isStart(prevX, prevY)) {
          this.setStart(node);
        } else if (this.isGoal(prevX, prevY)) {
          this.setGoal(node);
        } else {
          node.toggleIsObstacle();
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

  setStart(node) {
    if(this.start) {
      this.start.fillByString('empty');
    }

    node.fillByString('start');
    this.start = node;
  }

  setGoal(node) {
    if(this.goal) {
      this.goal.fillByString('empty');
    }
    node.fillByString('goal');
    this.goal = node;
  }

  drawGrid() {
    let grid = [];

    for(let i = 0; i < 15; i ++ ){
      grid.push([]);

      for(let j = 0; j < 15; j ++){
        const node = new graphNode(i*10, j*10);
        this.stage.addChild(node.easelCell);
        grid[i].push(node);
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
