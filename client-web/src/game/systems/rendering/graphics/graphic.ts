import * as Pixi from "pixi.js"

import { RenderingSystem } from "..";
import { RenderableComponent } from "../../../components/renderable";

export class Graphic {
  protected component: RenderableComponent;
  protected system: RenderingSystem;

  public displayObject: Pixi.DisplayObject;

  constructor(component: RenderableComponent, system: RenderingSystem) {
    this.component = component;
    this.system = system;
  }

  public initialize(): void {
    throw new Error(`You didn't define an initialize function for ${this}`);
  }

  public destroy(): void {
    throw new Error(`You didn't define a destroy function for ${this}`);
  }
}
