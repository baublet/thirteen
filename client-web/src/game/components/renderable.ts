import { Component } from "../lib/engine";
import { ComponentTypes } from "./";

export enum GraphicType {
  CARD,
}

export interface RenderableComponent extends Component {
  graphicType: GraphicType;
  x: number;
  y: number;
  z: number;
}

export function createRenderableComponent(
  graphicType: GraphicType = GraphicType.CARD
): RenderableComponent {
  return {
    type: ComponentTypes.RENDERABLE,
    graphicType,
    x: 0,
    y: 0,
    z: 100
  };
}
