import generateHands from "./generate-hands";

it("generates shuffled hands", () => {
  const hands = generateHands();
  expect(hands.length).toBe(4);
  hands.forEach(hand => expect(hand.length).toBe(13));
});
