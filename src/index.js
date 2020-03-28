import Game from './Game.js';
import View from './View.js';
import Controller from './Controller.js';

const canvas = document.querySelector('#myCanvas');

const game = new Game();
const view = new View(canvas, 800, 450);
const controller = new Controller(game, view);