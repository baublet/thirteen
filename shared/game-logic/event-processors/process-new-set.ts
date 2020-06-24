import { NewSetPayload, GameBoard } from "../game";

export default function processNewSet(
  eventPayload: NewSetPayload,
  gameBoard: GameBoard
): void {
  gameBoard.playedSets = gameBoard.playedSets || [];
  gameBoard.playedSets.push({
    open: true,
    passedPlayerIds: [],
    plays: [],
    set: eventPayload.set
  });
}