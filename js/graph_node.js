class graphNode {
  constructor(x, y, dx, dy) {
    this.easelCell = new createjs.Shape();
    this.dx = dx;
    this.dy = dy;
    this.setType('empty');
    this.setCoords(x, y);
  }

  setType(type) {
    if (['visited','frontier'].includes(type) &&
        ['start','goal','obstacle'].includes(this.type)) {
          return;
        }

    this.type = type;
    this._fill(graphNode.COLORS[type]);
  }

  setCoords(x, y) {
    this.coords = [x, y].toString();
    this.easelCell.x = x;
    this.easelCell.y = y;
  }

  toggleIsObstacle() {
    if(this.type === 'obstacle') {
      this.setType('empty');
    } else if (this.type === 'empty') {
      this.setType('obstacle');
    }
  }

  clearIfSearch() {
    if (['frontier', 'visited'].includes(this.type)) {
      this.setType('empty');
    }
  }

  clearIfObstacle() {
    if (this.type === 'obstacle') this.setType('empty');
  }

  _fill(color) {
    this.easelCell.graphics.clear();
    this.drawBorder();
    this.easelCell
      .graphics
      .beginFill(color)
      .drawRect(1,1,this.dx-2,this.dy-2)
      .endFill();
  }

  drawBorder() {
    this.easelCell
      .graphics
      .setStrokeStyle(1)
      .beginStroke('#fff')
      .drawRect(0,0,this.dx,this.dy)
      .endStroke();
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
