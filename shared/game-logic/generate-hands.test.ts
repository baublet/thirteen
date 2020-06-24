import generateHands from "./generate-hands";
import { Card } from "./game";

it("generates shuffled hands", () => {
  const hands = generateHands();
  expect(hands.length).toBe(4);
  hands.forEach(hand => expect(hand.length).toBe(13));
});

it("generates hands with all unique cards", () => {
  const hands = generateHands();
  const cards: Card[] = [];
  hands.forEach(hand => {
    hand.forEach(card => {
      if(cards.includes(card)) {
        throw `Shuffler dealt the same card multiple times! (${card})`
      }
      cards.push(card);
    })
  })
})