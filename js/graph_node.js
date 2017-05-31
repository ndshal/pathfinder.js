class graphNode {
  constructor(x, y) {
    this.easelCell = new createjs.Shape();
    this.drawBorder();
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

  _fill(color) {
    this.easelCell.graphics.beginFill(color).drawRect(0,0,10,10);
  }

  drawBorder() {
    this.easelCell
      .graphics
      .setStrokeStyle(0.5)
      .beginStroke('#ffffff')
      .drawRect(0,0,10,10);
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
