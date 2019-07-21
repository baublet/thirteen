import isMultiRun from "./is-multi-run";
import { Card } from "./game";

it("it detects double-runs properly", () => {
  const multi = isMultiRun([
    Card.SPADES_3,
    Card.CLUBS_3,
    Card.SPADES_4,
    Card.CLUBS_4,
    Card.SPADES_5,
    Card.CLUBS_5
  ]);
  expect(multi).toBeTruthy();
  expect(multi[0]).toBe(3);
  expect(multi[1]).toBe(2);
});

it("it detects triple-runs properly", () => {
  const multi = isMultiRun([
    Card.SPADES_3,
    Card.CLUBS_3,
    Card.HEARTS_3,
    Card.SPADES_4,
    Card.HEARTS_4,
    Card.CLUBS_4,
    Card.SPADES_5,
    Card.CLUBS_5,
    Card.DIAMONDS_5
  ]);
  expect(multi).toBeTruthy();
  expect(multi[0]).toBe(3);
  expect(multi[1]).toBe(3);
});

it("rejects non multirun", () => {
  expect(
    isMultiRun([
      Card.SPADES_3,
      Card.CLUBS_3,
      Card.HEARTS_3,
      Card.SPADES_4,
      Card.HEARTS_4,
      Card.CLUBS_4,
      Card.CLUBS_5,
      Card.DIAMONDS_5
    ])
  ).toBeFalsy();
});
