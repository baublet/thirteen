import { Player, Card, Set } from "../game";
import processNewSet from "./process-new-set";
import { blankBoard } from "../build-board";

let id = 0;

const player = (): Player => {
  return {
    playerId: id++,
    hand: [Card.CLUBS_3]
  };
};

const players: Player[] = [player(), player(), player(), player()];

it("processes a new set", () => {
  const board = blankBoard();
  processNewSet(
    {
      set: Set.TWO
    },
    board
  );
  expect(board.playedSets[board.playedSets.length - 1].set).toBe(Set.TWO);
});
