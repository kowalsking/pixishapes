import "./css/style.css";
import View from "./View/View";
import Controller from "./Controller/Controller";
import config from "./tools/config";

const view = new View(config);
// eslint-disable-next-line no-new
new Controller(view);
