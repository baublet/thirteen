import { Set, Player, Card } from "../game";
import { blankBoard } from "../build-board";
import advanceBoardToNextTurn from "./advance-board-to-next-turn";

let id = 0;

const player = (): Player => {
  return {
    playerId: id++,
    hand: [Card.CLUBS_3]
  };
};

const players: Player[] = [player(), player(), player(), player()];

it("advances a game board to the next turn", () => {
  const board = blankBoard();
  board.players = players;
  (board.playerTurn = players[0].playerId),
    (board.playedSets = [
      {
        set: Set.ONE,
        open: true,
        plays: [],
        passedPlayerIds: []
      }
    ]);
  advanceBoardToNextTurn(board);
  expect(board.playerTurn).toBe(players[1].playerId);
  advanceBoardToNextTurn(board);
  expect(board.playerTurn).toBe(players[2].playerId);
  advanceBoardToNextTurn(board);
  expect(board.playerTurn).toBe(players[3].playerId);
  advanceBoardToNextTurn(board);
  expect(board.playerTurn).toBe(players[0].playerId);
});
