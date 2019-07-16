import { Card, Hand } from "./game";
import shuffleArray from "./shuffle";

const MAX_CARDS = 13;

const Cards = () =>
  Object.keys(Card).filter(val => isNaN(parseInt(`${val}`, 10)));

export default function generateHands(
  players = 4,
  maxCards = MAX_CARDS
): Hand[] {
  const allCards = shuffleArray(Cards());
  let cardsDealt = 0;
  const hands = [];
  for (let i = 0; i < players; i++) {
    hands.push([]);
  }
  while (allCards.length && cardsDealt < maxCards) {
    hands.forEach(hand => {
      hand.push(parseInt(Card[allCards.pop()], 10));
    });
    cardsDealt++;
  }
  return hands;
}
