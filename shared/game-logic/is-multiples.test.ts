import isMultiples from "./is-multiples";
import { Card } from "./game";

it("return false for non-multiples", () => {
  expect(isMultiples([Card.SPADES_2, Card.HEARTS_3])).toBeFalsy();
});

it("return false for non-multiples", () => {
  expect(
    isMultiples([Card.SPADES_2, Card.HEARTS_2, Card.HEARTS_3])
  ).toBeFalsy();
});

it("return true for twos", () => {
  expect(isMultiples([Card.SPADES_2, Card.HEARTS_2])).toBeTruthy();
});

it("return true for threes", () => {
  expect(
    isMultiples([Card.SPADES_2, Card.HEARTS_2, Card.DIAMONDS_2])
  ).toBeTruthy();
});

it("return true for fours", () => {
  expect(
    isMultiples([Card.SPADES_2, Card.HEARTS_2, Card.DIAMONDS_2, Card.CLUBS_2])
  ).toBeTruthy();
});
