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
      let childY = child.y;
      childY += gravityValue;
      if (childY > this.app.screen.height + child.height) {
        this.container.removeChild(child);
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
