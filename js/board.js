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

    const color = cell.isObstacle? '#e8e8e8' : '#c1c1c1';
    cell.graphics.beginFill(color).drawRect(0,0,10,10);
    cell.isObstacle = !cell.isObstacle;
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
      this.colorCell(this.start, '#e8e8e8');
    }
    this.colorCell(cell, '#ff0000');
    this.start = cell;
  }

  setGoal(cell) {
    if(this.goal) {
      this.colorCell(this.goal, '#e8e8e8');
    }
    this.colorCell(cell, '#0000ff');
    this.goal = cell
  }

  colorCell(cell, color) {
    cell.graphics.beginFill(color).drawRect(0,0,10,10);
  }

  drawGrid() {
    for(let i = 0; i < 15; i ++ ){
      for(let j = 0; j < 15; j ++){
        const cell = new createjs.Shape().set({x: i*10, y: j*10});
        cell.graphics.setStrokeStyle(0.5).beginStroke("#ffffff");
        cell.isObstacle = false;
        cell.on('click', (e) => this.toggleObstacle(e.target))
        cell.graphics.beginFill('#e8e8e8').drawRect(0, 0, 10, 10);
        this.stage.addChild(cell)
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
