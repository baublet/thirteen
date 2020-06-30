import { Component, ComponentType, Entity, Engine } from "../lib/engine";

export enum GraphicType {
  CARD,
}

export class RenderableComponent implements Component {
  public type: ComponentType;
  public graphicType: GraphicType = GraphicType.CARD;
  public onCreate(entity: Entity, engine: Engine) {
    console.log(engine);
    console.log(entity);
  }
}
