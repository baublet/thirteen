import isRun from "./is-run";
import { Card } from "./game";

it("return false if the cards don't represent a run", () => {
  expect(isRun([Card.HEARTS_3, Card.SPADES_4, Card.HEARTS_4])).toBeFalsy();
  expect(isRun([Card.HEARTS_3, Card.SPADES_4])).toBeFalsy();
  expect(isRun([Card.HEARTS_3, Card.SPADES_4, Card.HEARTS_7])).toBeFalsy();
  expect(isRun([Card.HEARTS_JACK, Card.SPADES_ACE, Card.CLUBS_2])).toBeFalsy();
  expect(
    isRun([
      Card.HEARTS_JACK,
      Card.SPADES_ACE,
      Card.CLUBS_QUEEN,
      Card.SPADES_KING,
      Card.HEARTS_2
    ])
  ).toBeFalsy();
  expect(
    isRun([
      Card.HEARTS_JACK,
      Card.SPADES_ACE,
      Card.CLUBS_QUEEN,
      Card.SPADES_KING,
      Card.SPADES_JACK
    ])
  ).toBeFalsy();
});

it("return the run number if the cards represent a run", () => {
  expect(isRun([Card.HEARTS_3, Card.SPADES_4, Card.HEARTS_5])).toBe(3);
  expect(isRun([Card.HEARTS_5, Card.SPADES_6, Card.HEARTS_7])).toBe(3);
  expect(
    isRun([
      Card.HEARTS_3,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.HEARTS_6,
      Card.HEARTS_7,
      Card.HEARTS_8,
      Card.HEARTS_9,
      Card.HEARTS_10,
      Card.HEARTS_JACK,
      Card.HEARTS_QUEEN,
      Card.HEARTS_KING,
      Card.HEARTS_ACE
    ])
  ).toBe(12);
});
