import { Component } from "../lib/engine";
import { ComponentTypes } from "./";

export enum GraphicType {
  CARD,
}

export interface RenderableComponent extends Component {
  graphicType: GraphicType;
}

export function createRenderableComponent(
  graphicType: GraphicType = GraphicType.CARD
): RenderableComponent {
  return {
    type: ComponentTypes.RENDERABLE,
    graphicType,
  };
}
