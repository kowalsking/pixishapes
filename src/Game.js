class Game {
  constructor() { }

  createShape(x, y) {
    const shapes = ['triangle', 'quadrangle', 'pentagon', 'hexagon', 'circle', 'ellipse', 'random'];
    const index = Math.floor(Math.random() * shapes.length);
    const type = shapes[index];
    let path;

    switch (type) {
      case 'triangle':
        path = this.createPolygonPoints(3, x, y);
        break;
      case 'quadrangle':
        path = this.createPolygonPoints(4, x, y);
        break;
      case 'pentagon':
        path = this.createPolygonPoints(5, x, y);
        break;
      case 'hexagon':
        path = this.createPolygonPoints(6, x, y);
        break;
      case 'circle':
        path = this.createPolygonPoints(360, x, y);
        break;
      case 'ellipse':
        path = this.createPolygonPoints(360, x, y, true);
        break;
      case 'random':
        path = this.createPolygonPoints(7, x, y);
        break;
    }
    return this.createPolygon(path);
  }

  createPolygon(path) {
    let polygon = new PIXI.Graphics();
    polygon.lineStyle(0);
    polygon.beginFill(this.randomColour());
    polygon.drawPolygon(path);
    polygon.endFill();
    this.makeInteractive(polygon);
    return polygon;
  }

  createPolygonPoints(numberOfSides, x, y, isEllipse) {
    const isRandom = numberOfSides === 7;
    const size = this.getRandomRange(30, 50);
    x = x ? x : this.getRandomRange(size, 800 - size);
    y = y ? y : -size;
    const step = 2 * Math.PI / numberOfSides;
    const shift = (Math.PI / 180.0) * -18;
    let path = [];
    for (let i = 0; i <= numberOfSides; i++) {
      const curStep = i * step + shift;
      const x1 = x + size * Math.cos(curStep) * (isRandom ? Math.random() : 1);
      const x2 = y - (isEllipse ? 0.5 : -1) * size * Math.sin(curStep);
      path.push(x1, x2);
    }
    return path;
  }

  randomColour() {
    return Math.random() * 0xFFFFFF;
  }

  makeInteractive(entity) {
    entity.interactive = true;
    entity.buttonMode = true;
  }

  getRandomRange(from, to) {
    const min = Math.ceil(from);
    const max = Math.floor(to);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Game;
