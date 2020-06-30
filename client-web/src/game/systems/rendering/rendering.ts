import * as Pixi from "pixi.js";
import { System, ComponentType } from "../../lib/engine";

import { RenderableComponent } from "../../components/renderable";
import { Graphic } from "./graphics";
import { graphicForComponent } from "./graphics/graphic-for-component";

export class RenderingSystem implements System<RenderableComponent> {
  public componentType: ComponentType;
  private pixiApp: Pixi.Application;
  private dirty: boolean = false;
  private components: Map<RenderableComponent, Graphic> = new Map();

  public initialize() {
    this.pixiApp = new Pixi.Application({ antialias: true });
    this.pixiApp.ticker.add(() => {
      if (this.dirty) {
        this.dirty = false;
        for (const graphic of this.components.values()) {
          graphic.render();
        }
      }
    });
  }

  public update() {}

  public afterCreate(_: unknown, component: RenderableComponent) {
    const GraphicClass = graphicForComponent(component);
    this.components.set(component, new GraphicClass(component, this));
    this.dirty = true;
  }

  public beforeDestroy(_: unknown, component: RenderableComponent) {
    const graphic = this.components.get(component);
    if (graphic) {
      graphic.destroy();
    }
    this.components.delete(component);
    this.dirty = true;
  }

  public afterComponentUpdates() {
    this.dirty = true;
  }
}
