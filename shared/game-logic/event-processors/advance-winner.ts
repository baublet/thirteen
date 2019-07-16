import { GameBoard, Player } from "../game";

export default function advanceWinnerIfApplicable(
  gameBoard: GameBoard
): boolean {
  let winner: number | false = false;
  gameBoard.players.forEach((player: Player) => {
    if (player.hand.length === 0) {
      winner = player.playerId;
    }
  });
  if (winner === false) {
    return false;
  }
  gameBoard.winnerPlayerId = winner;
}
