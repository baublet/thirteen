import * as Pixi from "pixi.js";

import { CardTypeEnum } from "./";
import { Graphic } from "../graphic";
import { ComponentTypes } from "../../../../components";
import { CardComponent, CardSuitEnum } from "../../../../components/card";
import { Asset } from "../../../../assets/";

const colors = {
  red: 0xc53e3a,
  black: 0x444
}

export class CardGraphic extends Graphic {
  public displayObject: Pixi.DisplayObject;
  public card: CardComponent;
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  protected color(): "red" | "black" {
    switch(this.card.suit) {
      case CardSuitEnum.CLUBS:
      case CardSuitEnum.SPADES:
        return "black"
      default:
        return "red"
    }
  }

  protected cardText(type: CardTypeEnum, color: "red" | "black") {
    const style = new Pixi.TextStyle({
      fontFamily: "Georgia",
      fontSize: 24,
      fill: colors[color]
    });
    return new Pixi.Text(type, style);
  }

  protected heart() {
    const heartContainer = new Pixi.Container();

    const texture = Pixi.utils.TextureCache[Asset.HEART_CLASSIC];
    const sprite = new Pixi.Sprite(texture);

    heartContainer.addChild(sprite);
    return heartContainer;
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

    const color = this.color()

    const topLeftText = this.cardText(type, color);
    topLeftText.x = 10;
    topLeftText.y = 10;
    const topRightText = this.cardText(type, color);
    topRightText.x = container.width - (10 + topLeftText.width);
    topRightText.y = container.height - (10 + topLeftText.height);

    container.addChild(topLeftText);
    container.addChild(topRightText);

    const centerShape = this.heart();
    centerShape.scale.x = 1.75;
    centerShape.scale.y = 1.75;
    centerShape.x = container.width / 2 - centerShape.width * .5;
    centerShape.y = container.height / 2 - centerShape.height * .5;
    container.addChild(centerShape);
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

  public render() {
    this.displayObject.x = this.x;
    this.displayObject.y = this.y;
    this.displayObject.zIndex = this.z;
  }

  public destroy() {
    this.displayObject.destroy();
  }
}
