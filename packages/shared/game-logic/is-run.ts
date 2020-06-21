import { Card } from "./game";
import { runIndex } from "./data/card-indexes";

const MINIMUM_RUN_LENGTH = 3;

export default function isRun(cards: Card[]): false | number {
  const firstIndex: number = ((firstCard: Card) => {
    for (let i = 0; i < runIndex.length; i++) {
      if (runIndex[i].includes(firstCard)) {
        return i;
      }
    }
    return 0;
  })(cards[0]);
  let setSpan = 0;
  // Start at the first card, e.g., "5", and check each of the following
  // indexes for cards in the players' hand. So we then move to "6", and
  // check their hand for a 6 of clubs, spades, diamonds, and hearts.
  for (let i = firstIndex; i < runIndex.length; i++) {
    let partOfNextNumber = false;
    for (let j = 0; j < runIndex[i].length; j++) {
      // If the cards includes this one, increment the span length, tell the
      // indexer loop that we're good to keep checking!
      if (!partOfNextNumber && cards.includes(runIndex[i][j])) {
        setSpan++;
        partOfNextNumber = true;
      }
    }
    // If we can't find any cards that continue this run and we haven't yet hit
    // our minimum run amount, then we aren't in a run!
    if (!partOfNextNumber && setSpan < MINIMUM_RUN_LENGTH) {
      return false;
    }
  }

  // This check makes it so that if the user has a run of, e.g., 3, 4, and 5,
  // but also throw in something like a King. We won't return a run of three.
  if (setSpan === cards.length) {
    return setSpan;
  }

  return false;
}
