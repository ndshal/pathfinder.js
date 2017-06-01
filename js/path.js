class Path {
  constructor(path, stage) {
    this.stage = stage;
    this.processStringPath(path);
  }

  processStringPath(stringPath) {
    this.path = new createjs.Shape();
    this.path.graphics.setStrokeStyle(1).beginStroke('#ff0');

    stringPath.forEach(
      function(strCoords) {
        let [x,y] = strCoords.split(',').map(s => parseInt(s));
        x += 5; y += 5; // center on square, refactor this!
        this.path.graphics.lineTo(x, y);
      }.bind(this)
    );
    this.path.graphics.endStroke();
    this.stage.addChild(this.path);
  }

  reset() {
    this.stage.removeChild(this.path);
  }
}

export default Path;
