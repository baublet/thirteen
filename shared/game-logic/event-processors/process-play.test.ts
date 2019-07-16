import { blankBoard } from "../build-board";
import processPlay from "./process-play";
import processNewSet from "./process-new-set";
import { Player, Card, Set } from "../game";

let id = 0;

const player = (): Player => {
  return {
    playerId: id++,
    hand: [Card.CLUBS_3]
  };
};

const players: Player[] = [player(), player(), player(), player()];

it("processes a new play", () => {
  const board = blankBoard();
  board.players = players;
  processNewSet(
    {
      set: Set.TWO
    },
    board
  );
  expect(board.playedSets[board.playedSets.length - 1].set).toBe(Set.TWO);
  expect(board.playedSets[board.playedSets.length - 1].open).toBeTruthy();
  processPlay(
    {
      cards: [Card.CLUBS_10, Card.CLUBS_3],
      playerId: board.players[0].playerId
    },
    board
  );
  expect(board.playedSets[board.playedSets.length - 1].plays.length).toBe(1);
  expect(
    board.playedSets[board.playedSets.length - 1].plays[0].cards.length
  ).toBe(2);
});
