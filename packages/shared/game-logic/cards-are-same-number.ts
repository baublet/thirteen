import { numberIndex } from "./data/card-indexes";
import { Card } from "./game";

export default function cardsAreSameNumber(card1: Card, card2: Card): boolean {
  for (let i = 0; i < numberIndex.length; i++) {
    if (!numberIndex[i].includes(card1)) {
      continue;
    }
    if (numberIndex[i].includes(card2)) {
      return true;
    }
  }
  return false;
}
