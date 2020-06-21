import { ConcedePayload, GameBoard } from "../game";

export default function processConcede(
  { playerId }: ConcedePayload,
  gameBoard: GameBoard
): void {
  gameBoard.losingPlayerIds.push(playerId);
}