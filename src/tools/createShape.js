import * as PIXI from "pixi.js";
import config from "./config";

// random colour
const randomColour = () => {
  return Math.random() * 0xffffff;
};

// add the ability to interact with the element
const makeInteractive = polygon => {
  const entity = polygon;
  entity.interactive = true;
  entity.buttonMode = true;
};

// random number in the range
const getRandomRange = (from, to) => {
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min)) + min;
};

// draw a polygon at specific points
const createPolygon = (path, type) => {
  const polygon = new PIXI.Graphics();
  polygon.lineStyle(0);
  polygon.beginFill(randomColour());
  polygon.drawPolygon(path);
  polygon.endFill();
  polygon.type = type;
  makeInteractive(polygon);
  return polygon;
};

const createPolygonPoints = (numberOfSides, xPoint, yPoint, isEllipse) => {
  const isRandom = numberOfSides === 7;
  // get random size of shape from 30 to 50
  const size = getRandomRange(30, 50);
  // if x does not exist, take a random value across the entire width of the scene
  const x = xPoint || getRandomRange(size, config.width - size);
  // if y does not exist, take the minimum value above the scene
  const y = yPoint || -size;
  const step = (2 * Math.PI) / numberOfSides;
  const shift = (Math.PI / 180.0) * -18;
  const path = [];
  for (let i = 0; i <= numberOfSides; i += 1) {
    const curStep = i * step + shift;
    // some extended trigonometric formula
    const x1 = x + size * Math.cos(curStep) * (isRandom ? Math.random() : 1);
    const x2 = y - (isEllipse ? 0.5 : -1) * size * Math.sin(curStep);
    // fill the array with points for drawing
    path.push(x1, x2);
  }
  return path;
};

const createShape = (x, y) => {
  // all possible types of shapes
  const shapes = [
    "triangle",
    "quadrangle",
    "pentagon",
    "hexagon",
    "circle",
    "ellipse",
    "random"
  ];
  // get random type of shape
  const index = Math.floor(Math.random() * shapes.length);
  const type = shapes[index];
  let path;
  switch (type) {
    case "triangle":
      path = createPolygonPoints(3, x, y, false);
      break;
    case "quadrangle":
      path = createPolygonPoints(4, x, y, false);
      break;
    case "pentagon":
      path = createPolygonPoints(5, x, y, false);
      break;
    case "hexagon":
      path = createPolygonPoints(6, x, y, false);
      break;
    case "circle":
      path = createPolygonPoints(360, x, y, false);
      break;
    case "ellipse":
      path = createPolygonPoints(360, x, y, true);
      break;
    case "random":
      path = createPolygonPoints(7, x, y, false);
      break;
    default:
  }
  return createPolygon(path, type);
};

export default createShape;
