import { NewGamePayload, GameBoard } from "../game";

export default function processNewGame(
  eventPayload: NewGamePayload,
  gameBoard: GameBoard
): void {
  gameBoard.players = eventPayload.players;
  gameBoard.playerTurn = gameBoard.players[0].playerId;
  gameBoard.losingPlayerIds = [];
}
