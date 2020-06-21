import getSetType from "./get-set-type";
import { Card, Set } from "./game";

it("gets a multi type properly", () => {
  const multi = getSetType([
    Card.SPADES_3,
    Card.CLUBS_3,
    Card.SPADES_4,
    Card.CLUBS_4,
    Card.SPADES_5,
    Card.CLUBS_5
  ]);
  expect(multi).toBe(Set.MULTI_RUN);
});
