import processPass from "./process-pass";
import { blankBoard } from "../build-board";
import { Player, Card, Set } from "../game";

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
  board.players = players;
  board.playerTurn = board.players[0].playerId;
  board.playedSets.push({
    set: Set.ONE,
    passedPlayerIds: [],
    plays: [],
    open: true
  });
  processPass(
    {
      playerId: board.players[0].playerId
    },
    board
  );
  const passedPlayers =
    board.playedSets[board.playedSets.length - 1].passedPlayerIds;
  expect(passedPlayers.length).toBe(1);
  expect(passedPlayers.includes(board.players[0].playerId)).toBeTruthy();
});
