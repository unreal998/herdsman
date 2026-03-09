import { Application } from "pixi.js";
import { YardModel } from "./YardModel";
import { YardView } from "./YardView";

export class YardController {

  private model!: YardModel;
  private view!: YardView;

  init(app: Application) {

    this.model = new YardModel();
    this.view = new YardView(this.model.colorsConfig);
    this.initView(app);
  }

  private initView(app: Application) {
    app.stage.addChild(this.view.field);
    app.stage.addChild(this.view.root);
  }
}