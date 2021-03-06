import { Card, Set } from "./game";
import isRun from "./is-run";
import isMultiples from "./is-multiples";
import isMultiRun from "./is-multi-run";

export default function getSetType(cards: Card[]): Set | false {
  cards.sort();

  if (cards.length === 1) {
    return Set.ONE;
  }

  if (isMultiples(cards)) {
    switch (cards.length) {
      case 2:
        return Set.TWO;
      case 3:
        return Set.THREE;
    }
    return Set.FOUR;
  }

  if (isRun(cards)) {
    return Set.RUN;
  }

  if (isMultiRun(cards)) {
    return Set.MULTI_RUN;
  }

  return false;
}
