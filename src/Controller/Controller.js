import fields from "../tools/fields";
// import createShape from "../tools/createShape";
import config from "../tools/config";
import Shape from "../tools/Shape.ts";

class Controller {
  constructor(view) {
    this.view = view;
    // when zeroGravity === true, shapes do not creates automatically
    this.zeroGravity = false;
    this.shapes = [];
    this.ticker = this.view.app.ticker;
    this.config = config;
    this.eventHandlers();
    this.run();
  }

  run() {
    // I don’t know how to do it right,
    // but it allowed me to get rid of the interval
    let intermediateValue = 0;
    const gameLoop = (delta) => {
      intermediateValue += delta;
      // approximately every second at FPS = 60
      if (intermediateValue >= this.ticker.FPS && !this.zeroGravity) {
        intermediateValue = 0;
        // create a given number of shapes
        for (let i = 0; i < this.config.numberPerSecond; i += 1) {
          const shape = new Shape();
          this.shapes.push(shape.shape);
          this.view.append(shape.shape.body);
        }
      }
      // update data
      this.view.constructor.updateShapeVolume(this.getState());
      this.view.constructor.updateShapeConfig(this.config);
      this.updateContainer(this.config);
    };
    // start moving
    this.ticker.add((delta) => gameLoop(delta));
  }

  updateContainer({ gravityValue }) {
    // for each shape we increase the value of the Y axis depending on gravityValue
    this.view.container.children.forEach((child, idx) => {
      const kid = child;

      kid.y += gravityValue;
      // if the child encounters the lower boundary of the container
      if (kid.y > this.view.app.screen.height + kid.height) {
        this.view.container.removeChild(kid);
        this.removeFromArray(idx);
      }
    });
  }

  getState() {
    // current number of pieces on the stage
    const numberOfShapes = this.view.container.children.length;
    // current amount of occupied area by shapes
    const areaOccupied = this.view.container.children.reduce((area, child) => {
      return area + Math.round(child.width * child.height);
    }, 0);

    return {
      numberOfShapes,
      areaOccupied,
    };
  }

  eventHandlers() {
    // stage click handler
    this.view.app.renderer.plugins.interaction.on("pointerdown", (e) => {
      // clicked on shape
      if (e.target) {
        // destroy shape
        e.target.destroy();
        this.shapes.forEach((sh, idx) => {
          if (e.target === sh.body) {
            // change colour of shapes with same type
            this.view.changeSiblingColour(sh.type, this.shapes);
            this.removeFromArray(idx);
          }
        });

        // clicked past the shape
      } else {
        // create a new shape in click coordinates
        const shape = new Shape(e.data.global.x, e.data.global.y);
        this.shapes.push(shape.shape);
        this.view.append(shape.shape.body);
      }
    });

    // increase the number of shapes per second
    fields.incNumber.addEventListener("click", () => {
      this.updateIncNumber();
    });

    // decrease the number of pieces per second
    fields.decNumber.addEventListener("click", () => {
      this.updateDecNumber();
    });

    // increase the gravity value
    fields.incGravity.addEventListener("click", () => {
      this.updateIncGravity();
    });

    // decrease the gravity value
    fields.decGravity.addEventListener("click", () => {
      this.updateDecGravity();
    });

    // flexible canvas
    window.addEventListener("resize", () => {
      this.view.app.renderer.resize(this.config.width, this.config.height);
    });
  }

  removeFromArray(idx) {
    this.shapes.splice(idx, 1);
  }

  updateIncNumber() {
    this.config.numberPerSecond += 1;
    fields.decNumber.classList.remove("disabled");
  }

  updateDecNumber() {
    this.config.numberPerSecond -= 1;
    // avoid negative number of shapes
    if (this.config.numberPerSecond === 0) {
      fields.decNumber.classList.add("disabled");
    }
  }

  updateIncGravity() {
    this.config.gravityValue += 1;
    if (fields.decGravity.classList.contains("disabled")) {
      fields.decGravity.classList.remove("disabled");
      this.zeroGravity = false;
    }
  }

  updateDecGravity() {
    this.config.gravityValue -= 1;
    // avoid negative gravity
    if (this.config.gravityValue === 0) {
      this.zeroGravity = true;
      fields.decGravity.classList.add("disabled");
    }
  }
}

export default Controller;
