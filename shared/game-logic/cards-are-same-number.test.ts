import cardsAreSameNumber from "./cards-are-same-number";
import { Card } from "./game";

it("compares numbers properly", () => {
  [
    [Card.DIAMONDS_10, Card.HEARTS_10, true],
    [Card.DIAMONDS_3, Card.HEARTS_3, true],
    [Card.DIAMONDS_2, Card.HEARTS_2, true],
    [Card.SPADES_2, Card.CLUBS_2, true]
  ].forEach(([first, second, expected]: [Card, Card, boolean]) => {
    expect(cardsAreSameNumber(first, second)).toBe(expected);
  });
});
