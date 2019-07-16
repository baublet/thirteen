import { PlayPayload, GameBoard } from "../game";
import getSetType from "../get-set-type";

export default function allowPlay(
  { cards, playerId }: PlayPayload,
  gameBoard: GameBoard
): boolean {
  // Not your turn? No go
  if (playerId !== gameBoard.playerTurn) {
    return false;
  }

  // Trying to put down a play that doesn't match any set type? Nope.
  const currentPlaySetType = getSetType(cards);

  if (!currentPlaySetType) {
    return false;
  }

  // Below here, we need to make sure the cards the player is trying to put
  // down beat the cards last played.

  // Trying to lay down a set that doesn't match the current set? Nope.
  const currentSet = gameBoard.playedSets[gameBoard.playedSets.length - 1];
  if (currentPlaySetType !== currentSet.set) {
    return false;
  }

  // Trying to lay down a set that's lower than the last played set? Nope.
  const highestPlayedCard = cards[cards.length - 1];
  const lastPlayCards = currentSet.plays[currentSet.plays.length - 1].cards;
  const highestLastPlayedCard = lastPlayCards[lastPlayCards.length - 1];

  if (highestLastPlayedCard > highestPlayedCard) {
    return true;
  }

  // If we get here, we've passed all of our checks. This move is legal!
  return true;
}
