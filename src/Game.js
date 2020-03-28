class Game {
  constructor() {
    this.container = new PIXI.Container();
  }

  createShape(x, y) {
    const shapes = ['triangle', 'quadrangle', 'pentagon', 'hexagon', 'circle', 'ellipse', 'random'];
    const index = Math.floor(Math.random() * shapes.length);
    const type = shapes[index];
    let shape;

    switch (type) {
      case 'triangle':
        shape = this.createPolygon(3, x, y);
        break;
      case 'quadrangle':
        shape = this.createPolygon(4, x, y);
        break;
      case 'pentagon':
        shape = this.createPolygon(5, x, y);
        break;
      case 'hexagon':
        shape = this.createPolygon(6, x, y);
        break;
      case 'circle':
        shape = this.createCircle(x, y);
        break;
      case 'ellipse':
        shape = this.createEllipse(x, y);
        break;
      case 'random':
        shape = this.createPolygon(7);
        break;
    }
    return shape;
  }

  createPolygon(numberOfSides, x, y) {
    const isRandom = numberOfSides === 7;
    const size = this.getRandomFromTo(30, 50);
    x = x ? x : this.getRandomFromTo(size, 800 - size);
    y = y ? y : -(size);
    const step = 2 * Math.PI / numberOfSides;
    const shift = (Math.PI / 180.0) * -18;
    const path = [];
    let polygon = new PIXI.Graphics();

    for (let i = 0; i <= numberOfSides; i++) {
      const curStep = i * step + shift;
      path.push(x + size * Math.cos(curStep) * (isRandom ? Math.random() : 1), y + size * Math.sin(curStep));
    }

    polygon.lineStyle(0);
    polygon.beginFill(Math.random() * 0xFFFFFF);
    polygon.drawPolygon(path);
    polygon.endFill();
    polygon.interactive = true;
    polygon.buttonMode = true;

    return polygon;
  }

  createCircle(x, y) {
    const r = this.getRandomFromTo(30, 50);
    x = x ? x : this.getRandomFromTo(r, 800 - r);
    y = y ? y : -(r);
    let circle = new PIXI.Graphics();
    circle.lineStyle(0);
    circle.beginFill(Math.random() * 0xFFFFFF);
    circle.drawCircle(x, y, r);
    circle.endFill();
    circle.interactive = true;
    circle.buttonMode = true;

    return circle;
  }

  createEllipse(x, y) {
    const w = this.getRandomFromTo(30, 50);
    const h = w / 1.6;
    x = x ? x : this.getRandomFromTo(h, 800 - h);
    y = y ? y : -(h);
    let ellipse = new PIXI.Graphics();
    ellipse.lineStyle(0);
    ellipse.beginFill(Math.random() * 0xFFFFFF);
    ellipse.drawEllipse(x, y, w, h);
    ellipse.endFill();
    ellipse.interactive = true;
    ellipse.buttonMode = true;
    return ellipse;
  }

  generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '0x';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  getRandomFromTo(from, to) {
    const min = Math.ceil(from);
    const max = Math.floor(to);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Game;