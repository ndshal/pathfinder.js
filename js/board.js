import Cell from './cell';
window.Cell = Cell;

class Board {
  constructor(stage) {
    this.stage = stage;
    createjs.Ticker.addEventListener("tick", evt => {
      if(!evt.paused) {
        this.stage.update();
      }
    });

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.toggleObstacle = this.toggleObstacle.bind(this);
  }

  handleMouseMove(e) {
    const currX = Math.floor(e.stageX/10)*10;
    const currY = Math.floor(e.stageY/10)*10;
    const prevX = this.handleMouseMove.prevX;
    const prevY = this.handleMouseMove.prevY;
    console.log(currX, currY);

    //only allow pressmove in discrete cells
    if (currX !== prevX || currY !== prevY) {
        const cell = this.stage.getObjectUnderPoint(currX, currY);
        if (this.isStart(prevX, prevY)) {
          this.setStart(cell);
        } else if (this.isGoal(prevX, prevY)) {
          this.setGoal(cell);
        } else {
          this.toggleObstacle(cell);
        }

        this.handleMouseMove.prevX = currX;
        this.handleMouseMove.prevY = currY;
    }
  }

  toggleObstacle(cell) {
    if (this.start === cell || this.goal === cell) {
      return false;
    }

    cell.toggleIsObstacle();
    return true;
  }

  isStart(x, y) {
    return x === this.start.x && y === this.start.y;
  }

  isGoal(x, y) {
    return x === this.goal.x && y === this.goal.y;
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
    this.goal = cell
  }

  drawGrid() {
    for(let i = 0; i < 15; i ++ ){
      for(let j = 0; j < 15; j ++){
        const cell = new Cell(i*10, j*10);
        cell.on('click', (e) => this.toggleObstacle(e.target))
        this.stage.addChild(cell.easelObj())
      }
    }

    this.setStart(this.stage.getChildAt(10));
    this.setGoal(this.stage.getChildAt(98));

    this.stage.on('pressmove', this.handleMouseMove);
    this.stage.on('pressup', () => {
      console.log('pressup');

      this.handleMouseMove.prevX = null;
      this.handleMouseMove.prevY = null;
    });
  }
}

export default Board;
