import * as PIXI from "pixi.js";

class Game {
  static createShape(x, y) {
    const shapes = [
      "triangle",
      "quadrangle",
      "pentagon",
      "hexagon",
      "circle",
      "ellipse",
      "random"
    ];
    const index = Math.floor(Math.random() * shapes.length);
    const type = shapes[index];
    let path;

    switch (type) {
      case "triangle":
        path = Game.createPolygonPoints(3, x, y);
        break;
      case "quadrangle":
        path = Game.createPolygonPoints(4, x, y);
        break;
      case "pentagon":
        path = Game.createPolygonPoints(5, x, y);
        break;
      case "hexagon":
        path = Game.createPolygonPoints(6, x, y);
        break;
      case "circle":
        path = Game.createPolygonPoints(360, x, y);
        break;
      case "ellipse":
        path = Game.createPolygonPoints(360, x, y, true);
        break;
      case "random":
        path = Game.createPolygonPoints(7, x, y);
        break;
      default:
    }
    return Game.createPolygon(path);
  }

  static createPolygon(path) {
    const polygon = new PIXI.Graphics();
    polygon.lineStyle(0);
    polygon.beginFill(Game.randomColour);
    polygon.drawPolygon(path);
    polygon.endFill();
    Game.makeInteractive(polygon);
    return polygon;
  }

  static createPolygonPoints(numberOfSides, xPoint, yPoint, isEllipse) {
    const isRandom = numberOfSides === 7;
    const size = Game.getRandomRange(30, 50);
    const x = xPoint || Game.getRandomRange(size, 800 - size);
    const y = yPoint || -size;
    const step = (2 * Math.PI) / numberOfSides;
    const shift = (Math.PI / 180.0) * -18;
    const path = [];
    for (let i = 0; i <= numberOfSides; i += 1) {
      const curStep = i * step + shift;
      const x1 = x + size * Math.cos(curStep) * (isRandom ? Math.random() : 1);
      const x2 = y - (isEllipse ? 0.5 : -1) * size * Math.sin(curStep);
      path.push(x1, x2);
    }
    return path;
  }

  static get randomColour() {
    return Math.random() * 0xffffff;
  }

  static makeInteractive(polygon) {
    const entity = polygon;
    entity.interactive = true;
    entity.buttonMode = true;
  }

  static getRandomRange(from, to) {
    const min = Math.ceil(from);
    const max = Math.floor(to);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Game;
