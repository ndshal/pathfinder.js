class Cell {
  constructor(x, y) {
    this.cell = new createjs.Shape();
    this.isObstacle = false;
    this.color = Cell.COLORS['empty'];

    this.moveTo(x, y);
    this.on = this.cell.on.bind(this.cell);
  }

  toggleIsObstacle() {
    this.color =  this.isObstacle? Cell.COLORS['obstacle'] : Cell.COLORS['empty'];
    this.fill(this.color)
    this.isObstacle = !this.isObstacle;
  }

  _fill(color) {
    this.cell.graphics.beginFill(color).drawRect(0,0,10,10);
  }

  fillByString(colorString) {
    this.color = Cell.COLORS[colorString];
    this._fill(Cell.COLORS[colorString]);
  }

  moveTo(x, y) {
    this.cell.x = x;
    this.cell.y = y;
  }

  easelObj() {
    return this.cell;
  }
}

Cell.COLORS = {
  'empty': '#e8e8e8',
  'start': '#ff0000',
  'goal': '#0000ff',
  'obstacle': '#c1c1c1'
};

export default Cell;
