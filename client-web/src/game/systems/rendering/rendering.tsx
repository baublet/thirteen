import React from "react";
import ReactDOM from "react-dom";

import { System, ComponentType, Entity, Engine } from "../../lib/engine";
import { ComponentTypes, RenderableComponent } from "../../components";
import { Game } from "./Game";
import { EngineProvider } from "./helpers/componentsProvider";

export class RenderingSystem implements System<RenderableComponent> {
  public componentConcerns: ComponentType[] = [ComponentTypes.RENDERABLE];
  protected components: RenderableComponent[] = [];

  public initialize(engine) {
    const applicationElement = document.getElementById("game");
    ReactDOM.render(
      <EngineProvider engine={engine}>
        <Game />
      </EngineProvider>,
      applicationElement
    );
  }

  public update() {}

  public afterComponentCreated(
    entity: Entity,
    component: RenderableComponent,
    engine: Engine
  ) {}

  public beforeDestroy(_: unknown, component: RenderableComponent) {}
}
