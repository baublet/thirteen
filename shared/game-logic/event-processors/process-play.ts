import { PlayPayload, GameBoard, Player, Card } from "../game";

export default function processPlay(
  eventPayload: PlayPayload,
  gameBoard: GameBoard
): void {
  // Remove the cards from the player's hand
  gameBoard.players.forEach((player: Player, i: number) => {
    if (player.playerId !== eventPayload.playerId) {
      return;
    }
    gameBoard.players[i].hand = player.hand.filter(
      (card: Card) => !eventPayload.cards.includes(card)
    );
  });
  // Add the play to the game board
  gameBoard.playedSets[gameBoard.playedSets.length - 1].plays.push({
    cards: eventPayload.cards,
    playerId: eventPayload.playerId
  });
}
