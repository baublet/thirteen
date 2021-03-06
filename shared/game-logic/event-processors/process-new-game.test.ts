import { blankBoard } from "../build-board";
import processNewGame from "./process-new-game";
import { Player, Card } from "../game";

let id = 0;
const gameId = id++;

const player = (): Player => {
  return {
    playerId: id++,
    hand: [Card.CLUBS_3]
  };
};

const players: Player[] = [player(), player(), player(), player()];

it("process a new game event", () => {
  const board = blankBoard();
  processNewGame({ players, id: gameId }, board);
  // @ts-ignore
  expect(board.players.length).toBe(4);
  // @ts-ignore
  const expectedBoard = blankBoard();
  expectedBoard.players = players;
  expectedBoard.playerTurn = players[0].playerId;
  expectedBoard.id = gameId;
  expect(board).toEqual(expectedBoard);
});
