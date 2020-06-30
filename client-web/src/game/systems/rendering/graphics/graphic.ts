import * as Pixi from "pixi.js";

import { RenderingSystem } from "..";
import { RenderableComponent } from "../../../components/renderable";
import { Entity, Engine } from "../../../lib/engine";

export class Graphic {
  protected component: RenderableComponent;
  protected system: RenderingSystem;
  protected entity: Entity;
  protected engine: Engine;

  public displayObject: Pixi.DisplayObject;

  constructor(
    entity: Entity,
    component: RenderableComponent,
    system: RenderingSystem,
    engine: Engine
  ) {
    this.component = component;
    this.system = system;
    this.entity = entity;
    this.engine = engine;
  }

  public initialize(): void {
    throw new Error(`You didn't define an initialize function for ${this}`);
  }

  public destroy(): void {
    throw new Error(`You didn't define a destroy function for ${this}`);
  }
}
