import { PassPayload, GameBoard } from "../game";

export default function processPass(
  eventPayload: PassPayload,
  gameBoard: GameBoard
): void {
  const setIndex = gameBoard.playedSets.length - 1;
  gameBoard.playedSets[setIndex].passedPlayerIds.push(eventPayload.playerId);
  if (
    gameBoard.playedSets[setIndex].passedPlayerIds.length ===
    gameBoard.players.length
  ) {
    gameBoard.playedSets[setIndex].open = false;
  }
}