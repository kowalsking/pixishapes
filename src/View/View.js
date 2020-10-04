import * as PIXI from "pixi.js";
import fields from "../tools/fields";

class View {
  constructor({ canvas, width, height }) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    this.createCanvas();
  }

  // create and add canvas to the page
  createCanvas() {
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
    });
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.canvas.appendChild(this.app.view);
  }

  append(shape) {
    this.container.addChild(shape);
  }

  // update the value of quantity and area ocсupied
  static updateShapeVolume({ numberOfShapes, areaOccupied }) {
    fields.currentShapes.textContent = numberOfShapes;
    fields.occupiedShapes.textContent = areaOccupied;
  }

  // update the value of quantity per second and gravity
  static updateShapeConfig({ numberPerSecond, gravityValue }) {
    fields.numberField.textContent = numberPerSecond;
    fields.gravityField.textContent = gravityValue;
  }

  changeSiblingColour(type, arr) {
    this.app;
    arr.forEach((sh) => {
      // if there are elements of the same type in the container
      if (type === sh.type) {
        const kid = sh.body;
        // create color matrix filter
        const color = new PIXI.filters.ColorMatrixFilter();
        kid.filters = [color];
        const { matrix } = color;
        // randomly change the matrix
        for (let i = 0; i <= 9; i += 1) {
          matrix[i] = Math.random() * Math.random();
        }
      }
    });
  }
}

export default View;
