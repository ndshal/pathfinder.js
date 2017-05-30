class Board {
  constructor(stage) {
    this.stage = stage;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const cell = e.target;
    console.log(e.target);
    cell.graphics.beginFill('#0FF').drawRect(0, 0, 10, 10);
    this.stage.update();
  }

  drawGrid() {
    for(let i = 0; i < 15; i ++ ){
      for(let j = 0; j < 15; j ++){
        const cell = new createjs.Shape();
        cell.graphics.setStrokeStyle(0.5).beginStroke("black");
        cell.x = i*10;
        cell.y = j*10;
        cell.graphics.beginFill('#FFF').drawRect(0, 0, 10, 10);
        cell.on('click', this.handleClick);

        this.stage.addChild(cell)
      }
    }

    this.stage.update();
  }
}

export default Board;
