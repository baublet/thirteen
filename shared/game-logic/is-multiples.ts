import { Card } from "./game";
import { numberIndex } from "./data/card-indexes";

export default function isMultiples(cards: Card[]): boolean {
  const firstCardNumberCards: Card[] = ((firstCard: Card) => {
    for (let i = 0; i < numberIndex.length; i++) {
      if (numberIndex[i].includes(firstCard)) {
        return numberIndex[i];
      }
    }
    return numberIndex[0];
  })(cards[0]);

  for (let i = 0; i < cards.length; i++) {
    if(!firstCardNumberCards.includes(cards[i])) {
      return false;
    }
    
  }
  return true;
}
