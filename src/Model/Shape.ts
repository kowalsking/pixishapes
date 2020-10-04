import { Graphics } from "pixi.js";
import config from "../tools/config";

type shapeType = {
  type: string;
  body: Graphics;
};

class Shape {
  shapes: string[];
  shape: shapeType;
  path: number[];

  constructor(private x: number | undefined, private y: number | undefined) {
    this.x = x;
    this.y = y;
    this.shape = {
      type: "",
      body: new Graphics(),
    };
    this.shapes = [
      "triangle",
      "quadrangle",
      "pentagon",
      "hexagon",
      "circle",
      "ellipse",
      "random",
    ];
    this.create();
  }

  create() {
    this.choosePolygonPoints(this.getRandomShape());
  }

  choosePolygonPoints(type: string): shapeType | undefined {
    switch (type) {
      case "triangle":
        this.path = this.createPolygonPoints(3, this.x, this.y, false);
        break;
      case "quadrangle":
        this.path = this.createPolygonPoints(4, this.x, this.y, false);
        break;
      case "pentagon":
        this.path = this.createPolygonPoints(5, this.x, this.y, false);
        break;
      case "hexagon":
        this.path = this.createPolygonPoints(6, this.x, this.y, false);
        break;
      case "circle":
        this.path = this.createPolygonPoints(360, this.x, this.y, false);
        break;
      case "ellipse":
        this.path = this.createPolygonPoints(360, this.x, this.y, true);
        break;
      case "random":
        this.path = this.createPolygonPoints(7, this.x, this.y, false);
        break;
      default:
    }
    return this.createPolygon(this.path, type);
  }

  createPolygon(path: number[], type: string): shapeType {
    this.shape.body = new Graphics();
    this.shape.body.lineStyle(0);
    this.shape.body.beginFill(this.randomColour());
    this.shape.body.drawPolygon(path);
    this.shape.body.endFill();
    this.shape.type = type;
    this.makeInteractive(this.shape.body);
    return this.shape;
  }
  createPolygonPoints(
    numberOfSides: number,
    xPoint: number | undefined,
    yPoint: number | undefined,
    isEllipse: boolean
  ): number[] {
    const isRandom: boolean = numberOfSides === 7;
    // get random size of shape from 30 to 50
    const size: number = this.getRandomRange(30, 50);
    // if x does not exist, take a random value across the entire width of the scene
    const x: number = xPoint || this.getRandomRange(size, config.width - size);
    // if y does not exist, take the minimum value above the scene
    const y: number = yPoint || -size;
    const step: number = (2 * Math.PI) / numberOfSides;
    const shift: number = (Math.PI / 180.0) * -18;
    const path: number[] = [];
    for (let i = 0; i <= numberOfSides; i += 1) {
      const curStep = i * step + shift;
      // some extended trigonometric formula
      const x1: number =
        x + size * Math.cos(curStep) * (isRandom ? Math.random() : 1);
      const y2: number = y - (isEllipse ? 0.5 : -1) * size * Math.sin(curStep);
      // fill the array with points for drawing
      path.push(x1, y2);
    }
    return path;
  }

  getRandomShape(): string {
    return this.shapes[Math.floor(Math.random() * this.shapes.length)];
  }

  getRandomRange(from: number, to: number): number {
    const min = Math.ceil(from);
    const max = Math.floor(to);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  makeInteractive = (polygon: Graphics): void => {
    const entity = polygon;
    entity.interactive = true;
    entity.buttonMode = true;
  };

  randomColour = (): number => Math.random() * 0xffffff;
}

export default Shape;
