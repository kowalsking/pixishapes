import * as PIXI from "pixi.js";

class Controller {
  constructor(game, view) {
    this.game = game.constructor;
    this.view = view;
    this.zeroGravity = false;
    this.ticker = this.view.app.ticker;

    this.options = {
      numberPerSecond: 1,
      gravityValue: 2
    };

    this.eventHandlers();
    this.run();
  }

  run() {
    let intermediateValue = 0;
    const gameLoop = delta => {
      intermediateValue += delta;
      if (intermediateValue >= this.ticker.FPS && !this.zeroGravity) {
        intermediateValue = 0;
        for (let i = 0; i < this.options.numberPerSecond; i += 1) {
          this.view.append(this.game.createShape());
        }
      }
      this.view.updateFields(this.getState());
      this.view.updateOptions(this.options);
      this.view.updateContainer(this.options);
    };
    this.ticker.add(delta => gameLoop(delta));
  }

  getState() {
    const numberOfShapes = this.view.container.children.length;
    const areaOccupied = this.view.container.children.reduce((area, child) => {
      return area + Math.round(child.width * child.height);
    }, 0);

    return {
      numberOfShapes,
      areaOccupied
    };
  }

  eventHandlers() {
    const incNumber = document.querySelector(".increase-number");
    const decNumber = document.querySelector(".decrease-number");
    const incGravity = document.querySelector(".increase-gravity");
    const decGravity = document.querySelector(".decrease-gravity");

    this.view.app.renderer.plugins.interaction.on("pointerdown", e => {
      if (e.target) {
        e.target.destroy();
        this.view.container.children.forEach(child => {
          if (e.target.type === child.type) {
            const kid = child;
            const color = new PIXI.filters.ColorMatrixFilter();
            kid.filters = [color];
            const { matrix } = color;

            for (let i = 0; i <= 9; i += 1) {
              matrix[i] = Math.random() * Math.random();
            }
          }
        });
      } else {
        this.view.append(
          this.game.createShape(e.data.global.x, e.data.global.y)
        );
      }
    });

    incNumber.addEventListener("click", () => {
      this.options.numberPerSecond += 1;
      decNumber.classList.remove("disabled");
    });

    decNumber.addEventListener("click", () => {
      this.options.numberPerSecond -= 1;
      if (this.options.numberPerSecond === 0) {
        decNumber.classList.add("disabled");
      }
    });

    incGravity.addEventListener("click", () => {
      this.options.gravityValue += 1;
      if (decGravity.classList.contains("disabled")) {
        decGravity.classList.remove("disabled");
        this.zeroGravity = false;
      }
    });

    decGravity.addEventListener("click", () => {
      this.options.gravityValue -= 1;
      if (this.options.gravityValue === 0) {
        this.zeroGravity = true;
        decGravity.classList.add("disabled");
      }
    });
  }
}

export default Controller;
