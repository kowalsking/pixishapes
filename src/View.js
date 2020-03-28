class View {
  constructor(root, width, height) {
    this.root = root;
    this.width = width;
    this.height = height;

    this.createApp();
  }

  createApp() {
    this.app = new PIXI.Application({ width: this.width, height: this.height });
    this.root.appendChild(this.app.view);
  }

  start(container, options) {
    this.app.ticker.add(delta => gameLoop(delta));

    const gameLoop = (delta) => {
      this.updateIndicators(container, options);
      container.children.forEach((child, idx) => {
        child.y += options.gravity;
        if (child.y > this.app.screen.height + child.height) {
          container.removeChild(child);
        }
      })
    }
    this.app.stage.addChild(container);
  }

  updateIndicators(container, options) {
    const currentShapes = document.querySelector('.current-shapes span');
    const occupiedShapes = document.querySelector('.occupied-shapes span');
    const number = document.querySelector('.number');
    const gravity = document.querySelector('.gravity');

    currentShapes.textContent = container.children.length;
    occupiedShapes.textContent = container.children.reduce((area, child) => {
      return area + Math.round(child.width * child.height)
    }, 0);
    number.textContent = options.number;
    gravity.textContent = options.gravity;
  }
}

export default View;