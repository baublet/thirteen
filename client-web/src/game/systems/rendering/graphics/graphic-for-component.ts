import {
  RenderableComponent,
  GraphicType,
} from "../../../components/renderable";
import { Graphic } from "./graphic";

import { CardGraphic } from "./card";

export function graphicForComponent(
  component: RenderableComponent
): typeof Graphic {
  switch (component.graphicType) {
    case GraphicType.CARD:
      return CardGraphic;
    default:
      throw new Error(`Unsupported graphic: ${component.graphicType}`);
  }
}
