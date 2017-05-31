class graphNode {
  constructor(x, y) {
    this.easelCell = new createjs.Shape();
    this.drawBorder();
    this.isObstacle = false;
    this.scale = 1;
    this.fillByString('empty')

    this.moveTo(x, y);
  }

  toggleIsObstacle() {
    this.isObstacle = !this.isObstacle;
    const str =  this.isObstacle? 'obstacle' : 'empty';
    this.fillByString(str);
  }

  _fill(color) {
    this.easelCell.graphics.beginFill(color).drawRect(0,0,10,10);
  }

  fillByString(colorString) {
    this.color = graphNode.COLORS[colorString];
    this._fill(graphNode.COLORS[colorString]);
  }

  drawBorder() {
    this.easelCell
      .graphics
      .setStrokeStyle(0.5)
      .beginStroke('#ffffff')
      .drawRect(0,0,10,10);
  }

  moveTo(x, y) {
    this.easelCell.x = x;
    this.easelCell.y = y;
  }
}

graphNode.COLORS = {
  'empty': '#e8e8e8',
  'start': '#f00',
  'goal': '#00f',
  'obstacle': '#c1c1c1',
  'visited': '#98fb98',
  'frontier': '#0ff'
};

export default graphNode;
