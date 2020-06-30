import * as Pixi from "pixi.js";

import { CardTypeEnum } from "./";
import { Graphic } from "../graphic";
import { ComponentTypes } from "../../../../components";
import { CardComponent } from "../../../../components/card";

export class CardGraphic extends Graphic {
  public displayObject: Pixi.DisplayObject;
  public card: CardComponent;
  protected textStyle = new Pixi.TextStyle({
    fontFamily: "Georgia",
    fontSize: 24,
    fill: "black",
  });

  protected cardText(type: CardTypeEnum) {
    return new Pixi.Text(type, this.textStyle);
  }

  protected front(container: Pixi.Container) {
    const type = this.card.cardType as CardTypeEnum;
    const cardFrontBackground = new Pixi.Graphics();
    cardFrontBackground.lineStyle(1, 0xeeeeee, 1);
    cardFrontBackground.beginFill(0xffffff);
    cardFrontBackground.drawRoundedRect(0, 0, 150, 200, 10);
    cardFrontBackground.endFill();

    container.x = 50;
    container.y = 50;

    container.addChild(cardFrontBackground);

    const topLeftText = this.cardText(type);
    topLeftText.x = 10;
    topLeftText.y = 10;
    const topRightText = this.cardText(type);
    topRightText.x = container.width - (10 + topLeftText.width);
    topRightText.y = container.height - (10 + topLeftText.height);

    container.addChild(topLeftText);
    container.addChild(topRightText);
  }

  public initialize() {
    this.card = this.engine.getEntityComponentsByType<CardComponent>(
      this.entity,
      ComponentTypes.CARD
    )[0];

    const container = new Pixi.Container();
    if (this.card.cardType) {
      this.front(container);
    }

    this.displayObject = container;
  }
  public destroy() {
    this.displayObject.destroy();
  }
}
