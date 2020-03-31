import "./css/style.css";
import Game from "./js/Game";
import View from "./js/View";
import Controller from "./js/Controller";

const canvas = document.querySelector("#myCanvas");

const game = new Game();
const view = new View(canvas, 800, 450);
// eslint-disable-next-line no-new
new Controller(game, view);
