const config = {
  get width() {
    return document.documentElement.clientWidth < 900
      ? document.documentElement.clientWidth
      : 800;
  },
  get height() {
    return this.width / 1.6;
  },
  canvas: document.querySelector("#myCanvas"),
  // setting the number and speed of shapes
  numberPerSecond: 1,
  gravityValue: 2
};

export default config;
