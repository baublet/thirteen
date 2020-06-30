import * as Pixi from "pixi.js";

import { System, ComponentType } from "../../lib/engine";
import { ComponentTypes, RenderableComponent } from "../../components";
import { Graphic } from "./graphics";
import { graphicForComponent } from "./graphics/graphic-for-component";

export class RenderingSystem implements System<RenderableComponent> {
  public componentConcerns: ComponentType[] = [ComponentTypes.RENDERABLE];
  private stage: Pixi.Container;
  private renderer: Pixi.Renderer;
  private dirty: boolean = false;
  private components: Map<RenderableComponent, Graphic> = new Map();

  public initialize() {
    const canvas = document.getElementById("game-canvas") as unknown;

    if (!canvas) {
      throw new Error(`Unable to find #game-canvas`);
    }

    this.stage = new Pixi.Container();
    this.renderer = Pixi.autoDetectRenderer({
      width: (canvas as HTMLCanvasElement).width,
      height: (canvas as HTMLCanvasElement).height,
      view: canvas as HTMLCanvasElement,
      antialias: true,
    });

    requestAnimationFrame(this.update);
  }

  public update() {
    if (!this.dirty) return;
    this.dirty = false;
    this.renderer.render(this.stage);
  }

  public afterCreate(_: unknown, component: RenderableComponent) {
    const GraphicClass = graphicForComponent(component);
    const graphic = new GraphicClass(component, this);
    this.components.set(component, graphic);
    this.stage.addChild(graphic.displayObject);
    this.dirty = true;
  }

  public beforeDestroy(_: unknown, component: RenderableComponent) {
    const graphic = this.components.get(component);
    if (graphic) {
      this.stage.removeChild(graphic.displayObject);
      graphic.destroy();
      this.dirty = true;
    }
    this.components.delete(component);
  }

  public afterComponentUpdates() {
    this.dirty = true;
  }
}
