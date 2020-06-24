import { Card } from "../game";

export const runIndex = [
  [Card.CLUBS_3, Card.SPADES_3, Card.DIAMONDS_3, Card.HEARTS_3],
  [Card.CLUBS_4, Card.SPADES_4, Card.DIAMONDS_4, Card.HEARTS_4],
  [Card.CLUBS_5, Card.SPADES_5, Card.DIAMONDS_5, Card.HEARTS_5],
  [Card.CLUBS_6, Card.SPADES_6, Card.DIAMONDS_6, Card.HEARTS_6],
  [Card.CLUBS_7, Card.SPADES_7, Card.DIAMONDS_7, Card.HEARTS_7],
  [Card.CLUBS_8, Card.SPADES_8, Card.DIAMONDS_8, Card.HEARTS_8],
  [Card.CLUBS_9, Card.SPADES_9, Card.DIAMONDS_9, Card.HEARTS_9],
  [Card.CLUBS_10, Card.SPADES_10, Card.DIAMONDS_10, Card.HEARTS_10],
  [Card.CLUBS_JACK, Card.SPADES_JACK, Card.DIAMONDS_JACK, Card.HEARTS_JACK],
  [Card.CLUBS_QUEEN, Card.SPADES_QUEEN, Card.DIAMONDS_QUEEN, Card.HEARTS_QUEEN],
  [Card.CLUBS_KING, Card.SPADES_KING, Card.DIAMONDS_KING, Card.HEARTS_KING],
  [Card.CLUBS_ACE, Card.SPADES_ACE, Card.DIAMONDS_ACE, Card.HEARTS_ACE]
];

export const numberIndex = [
  ...runIndex,
  [Card.CLUBS_2, Card.SPADES_2, Card.DIAMONDS_2, Card.HEARTS_2]
];
