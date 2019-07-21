import { Card } from "./game";
import { runIndex } from "./data/card-indexes";
import isRun from "./is-run";

export default function isMultiRun(
  originalCards: Card[]
): false | [number, number] {
  const cards = originalCards.slice(0);
  // First, get all multiples
  const multiples: Card[][] = [];
  while (cards.length) {
    const card = cards.shift();
    const multiple = [card];
    for (let i = 0; i < cards.length; i++) {
      if (cardIsSameNumberAs(card, cards[i])) {
        const cardToAdd = cards.splice(i, 1);
        console.log(`Adding ${cardToAdd} to ${JSON.stringify(multiple)}`)
        multiple.push(cardToAdd[0]);
      }
    }
    multiples.push(multiple);
  }

  console.log(multiples);

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
  const multiplesAsRun = multiples.map(multiple => multiple.pop());
  multiplesAsRun.sort();

  const run = isRun(multiplesAsRun);
  if (!run) {
    return false;
  }

  return [run, lengths];
}

function cardIsSameNumberAs(card1: Card, card2: Card): boolean {
  for (let i = 0; i < runIndex.length; i++) {
    if (!runIndex[i].includes(card1)) {
      continue;
    }
    if (runIndex[i].includes(card2)) {
      return true;
    }
    return false;
  }
  return false;
}
