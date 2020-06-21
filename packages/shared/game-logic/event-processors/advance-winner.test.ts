import { blankBoard } from "../build-board";
import { Player, Card } from "../game";
import advanceWinner from "./advance-winner";

let id = 0;

const player = (): Player => {
  return {
    playerId: id++,
    hand: [Card.CLUBS_3]
  };
};

const players: Player[] = [player(), player(), player(), player()];

it("sets a winner if there is a winner", () => {
  const board = blankBoard();
  board.players = [
    player(),
    player(),
    player(),
    {
      playerId: id++,
      hand: []
    }
  ];
  board.playerTurn = players[0].playerId;
  advanceWinner(board);
  expect(board.winnerPlayerId).toBe(board.players[3].playerId);
});
