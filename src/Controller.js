class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;

    this.options = {
      numberPerSecond: 1,
      gravityValue: 2
    }

    this.eventHandlers();
    this.run();
  }

  run() {
    setInterval(() => {
      for (let i = 0; i < this.options.numberPerSecond; i++) {
        this.view.append(this.game.createShape())
      }
    }, 1000)

    const gameLoop = () => {
      this.view.updateFields(this.getState());
      this.view.updateOptions(this.options);
      this.view.updateContainer(this.options);
    }

    this.view.app.ticker.add(() => gameLoop());
  }

  getState() {
    const numberOfShapes = this.view.container.children.length;
    const areaOccupied = this.view.container.children.reduce((area, child) => {
      return area + Math.round(child.width * child.height)
    }, 0);

    return {
      numberOfShapes,
      areaOccupied,
    }
  }

  eventHandlers() {
    const incNumber = document.querySelector('.increase-number');
    const decNumber = document.querySelector('.decrease-number');
    const incGravity = document.querySelector('.increase-gravity');
    const decGravity = document.querySelector('.decrease-gravity');

    this.view.app.renderer.plugins.interaction.on("pointerdown", (e) => {
      if (e.target) {
        e.target.destroy();
      } else {
        this.view.append(this.game.createShape(e.data.global.x, e.data.global.y));
      }
    })

    incNumber.addEventListener('click', e => {
      this.options.numberPerSecond++;
    })

    decNumber.addEventListener('click', e => {
      this.options.numberPerSecond--;
    })

    incGravity.addEventListener('click', e => {
      this.options.gravityValue++;
    })

    decGravity.addEventListener('click', e => {
      this.options.gravityValue--;
    })
  }
}

export default Controller;
