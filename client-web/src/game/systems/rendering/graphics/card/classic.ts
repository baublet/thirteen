import * as Pixi from "pixi.js";
import { Graphic } from "../graphic";

export class CardGraphic extends Graphic {
  protected graphic: Pixi.Graphics;
  public initialize() {
    this.graphic = new Pixi.Graphics();
  }
  public destroy() {
    this.graphic.destroy();
  }
  public render() {
    this.graphic.lineStyle(0);
    this.graphic.beginFill(0xffff0b, 0.5);
    this.graphic.drawCircle(470, 200, 100);
    this.graphic.endFill();
  }
}
