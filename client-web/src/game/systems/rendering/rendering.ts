import * as Pixi from "pixi.js";

import { System, ComponentType, Entity, Engine } from "../../lib/engine";
import { ComponentTypes, RenderableComponent } from "../../components";
import { Graphic } from "./graphics";
import { graphicForComponent } from "./graphics/graphic-for-component";

export class RenderingSystem implements System<RenderableComponent> {
  public componentConcerns: ComponentType[] = [ComponentTypes.RENDERABLE];
  protected stage: Pixi.Container;
  protected app: Pixi.Application;
  protected components: Map<RenderableComponent, Graphic> = new Map();

  public initialize() {
    this.app = new Pixi.Application({
      width: 256,
      height: 256,
      antialias: true,
      transparent: false,
      resolution: 1,
    });

    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.app.view);
    this.stage = this.app.stage;

    // Initial render
    this.app.renderer.render(this.stage);

    this.app.ticker.add(() => {
      this.update.bind(this);
    });
  }

  public update() {
    for (const [, graphic] of Object.values(this.components)) {
      graphic.render();
    }
    this.app.renderer.render(this.stage);
  }

  public afterComponentCreated(
    entity: Entity,
    component: RenderableComponent,
    engine: Engine
  ) {
    const GraphicClass = graphicForComponent(component);
    const graphic = new GraphicClass(entity, component, this, engine);
    graphic.initialize();
    this.components.set(component, graphic);
    this.stage.addChild(graphic.displayObject);
  }

  public beforeDestroy(_: unknown, component: RenderableComponent) {
    const graphic = this.components.get(component);
    if (graphic) {
      this.stage.removeChild(graphic.displayObject);
      graphic.destroy();
    }
    this.components.delete(component);
  }
}
