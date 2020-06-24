import { Card } from "./game";
import cardIsSameNumberAs from "./cards-are-same-number"
import isRun from "./is-run";

export default function isMultiRun(
  cards: Card[]
): false | [number, number] {
  // First, get all multiples
  const multiples: Card[][] = [];
  const cardsUsed: Card[] = [];
  cards.forEach(card => {
    if (cardsUsed.includes(card)) {
      return;
    }
    const multiple = [card];
    cardsUsed.push(card);
    for (let i = 0; i < cards.length; i++) {
      if (cardsUsed.includes(cards[i])) {
        continue;
      }
      if (cardIsSameNumberAs(card, cards[i])) {
        const cardToAdd = cards.slice(i, i + 1)[0];
        multiple.push(cardToAdd);
        cardsUsed.push(cardToAdd);
      }
    }
    multiples.push(multiple);
  })

  if (!multiples.length) {
    return false;
  }

  // If all the arrays don't have the same length, something fishy is happening.
  // Reject this set as not a double run.
  const lengths = multiples[0].length;
  for (let i = 0; i < multiples.length; i++) {
    if (multiples[i].length !== lengths) {
      return false;
    }
  }

  // Now just grab the first item from each array and run it through our
  // isRun function!
  const multiplesAsRun = multiples.map(multiple => multiple[0]);
  multiplesAsRun.sort();

  const run = isRun(multiplesAsRun);
  if (!run) {
    return false;
  }

  return [run, lengths];
}
