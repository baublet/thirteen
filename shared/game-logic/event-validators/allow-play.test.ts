import { Set, Player, Card } from "../game";
import { blankBoard } from "../build-board";
import allowPlay from "./allow-play";

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
  board.playerTurn = players[0].playerId;
  board.playedSets = [
    {
      set: Set.ONE,
      open: true,
      plays: [],
      passedPlayerIds: []
    }
  ];
});
