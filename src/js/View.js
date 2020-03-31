import * as PIXI from "pixi.js";

class View {
  constructor(root, width, height) {
    this.root = root;
    this.width = width;
    this.height = height;

    this.createCanvas();
    this.getFields();
  }

  createCanvas() {
    this.app = new PIXI.Application({ width: this.width, height: this.height });
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.root.appendChild(this.app.view);
  }

  append(shape) {
    this.container.addChild(shape);
  }

  updateContainer({ gravityValue }) {
    this.container.children.forEach(child => {
      const kid = child;

      kid.y += gravityValue;
      if (kid.y > this.app.screen.height + kid.height) {
        this.container.removeChild(kid);
      }
    });
  }

  getFields() {
    this.currentShapes = document.querySelector(".current-shapes span");
    this.occupiedShapes = document.querySelector(".occupied-shapes span");
    this.numberField = document.querySelector(".numberPerSecond");
    this.gravityField = document.querySelector(".gravityValue");
  }

  updateFields({ numberOfShapes, areaOccupied }) {
    this.currentShapes.textContent = numberOfShapes;
    this.occupiedShapes.textContent = areaOccupied;
  }

  updateOptions({ numberPerSecond, gravityValue }) {
    this.numberField.textContent = numberPerSecond;
    this.gravityField.textContent = gravityValue;
  }
}

export default View;
