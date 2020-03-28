class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;

    this.options = {
      gravity: 2,
      number: 1
    }

    this.createStartShapes(this.options.number);
    this.eventHandlers();
  }

  createStartShapes() {
    setInterval(() => {
      for (let i = 0; i < this.options.number; i++) {
        this.game.container.addChild(this.game.createShape());
      }
    }, 1000)
    this.view.start(this.game.container, this.options);
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
        this.game.container.addChild(this.game.createShape(e.data.global.x, e.data.global.y));
      }
    })

    incNumber.addEventListener('click', e => {
      this.options.number++;
    })

    decNumber.addEventListener('click', e => {
      this.options.number--;
    })

    incGravity.addEventListener('click', e => {
      this.options.gravity++;
    })

    decGravity.addEventListener('click', e => {
      this.options.gravity--;
    })
  }
}

export default Controller;