import { Card, Hand } from "./game";
import shuffleArray from "./shuffle";

const Cards = () =>
  Object.keys(Card).filter(val => isNaN(parseInt(`${val}`, 10)));

export default function generateHands(): [Hand, Hand, Hand, Hand] {
  const allCards = shuffleArray(Cards());
  const hands: [Hand, Hand, Hand, Hand] = [[], [], [], []];
  while (allCards.length) {
    hands[0].push(parseInt(Card[allCards.pop()], 10));
    hands[1].push(parseInt(Card[allCards.pop()], 10));
    hands[2].push(parseInt(Card[allCards.pop()], 10));
    hands[3].push(parseInt(Card[allCards.pop()], 10));
  }
  return hands;
}
