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
      height: this.height
    });
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.canvas.appendChild(this.app.view);
  }

  append(shape) {
    this.container.addChild(shape);
  }

  updateContainer({ gravityValue }) {
    // for each shape we increase the value of the Y axis depending on gravityValue
    this.container.children.forEach(child => {
      const kid = child;

      kid.y += gravityValue;
      // if the child encounters the lower boundary of the container
      if (kid.y > this.app.screen.height + kid.height) {
        this.container.removeChild(kid);
      }
    });
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

  changeSiblingColour(type) {
    this.container.children.forEach(child => {
      // if there are elements of the same type in the container
      if (type === child.type) {
        const kid = child;
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
