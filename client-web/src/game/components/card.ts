import { Component } from "../lib/engine";
import { ComponentTypes } from "./";

export enum CardTypeEnum {
  ACE = "A",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  JACK = "J",
  QUEEN = "Q",
  KING = "K",
}

export enum CardSuitEnum {
  HEARTS,
  SPADES,
  CLUBS,
  DIAMONDS,
}

export interface CardComponent extends Component {
  /**
   * This could be undefined if it's unknown (e.g., in another player's hand)
   */
  cardType: CardTypeEnum | undefined;
  suit: CardSuitEnum | undefined;
}

export function createCardComponent(
  card: CardTypeEnum | undefined = undefined,
  suit: CardSuitEnum | undefined = undefined
): CardComponent {
  return {
    type: ComponentTypes.CARD,
    cardType: card,
    suit,
  };
}
