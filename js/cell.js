class Cell {
  constructor(x, y) {
    this.cell = new createjs.Shape();
    this.cell.graphics.setStrokeStyle(0.5).beginStroke("#FFF");

    this.fill('#e8e8e8');
    this.moveTo(x, y);

    this.on = this.cell.on.bind(this.cell);
  }

  fill(color) {
    this.cell.graphics.beginFill(color).drawRect(0,0,10,10);
  }

  moveTo(x, y) {
    this.cell.x = x;
    this.cell.y = y;
  }
}

export default Cell;
