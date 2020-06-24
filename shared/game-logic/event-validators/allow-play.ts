import { PlayPayload, GameBoard } from "../game";
import getSetType from "../get-set-type";

export enum PlayViolationError {
  INCORRECT_SET,
  NONE,
  NOT_A_SET,
  NOT_YOUR_TURN,
  SET_TOO_LOW
}

export default function allowPlay(
  { cards, playerId }: PlayPayload,
  gameBoard: GameBoard
): [boolean, PlayViolationError] {
  // Not your turn? No go
  if (playerId !== gameBoard.playerTurn) {
    return [false, PlayViolationError.NOT_YOUR_TURN];
  }

  // Trying to put down a play that doesn't match any set type? Nope.
  const currentPlaySetType = getSetType(cards);

  if (!currentPlaySetType) {
    return [false, PlayViolationError.NOT_A_SET];
  }

  // Below here, we need to make sure the cards the player is trying to put
  // down beat the cards last played.

  // Trying to lay down a set that doesn't match the current set? Nope.
  const currentSet = gameBoard.playedSets[gameBoard.playedSets.length - 1];
  if (currentPlaySetType !== currentSet.set) {
    return [false, PlayViolationError.INCORRECT_SET];
  }

  // Trying to lay down a set that's lower than the last played set? Nope.
  const highestPlayedCard = cards[cards.length - 1];
  const lastPlay = currentSet.plays[currentSet.plays.length - 1];
  const lastPlayCards = lastPlay ? lastPlay.cards : [];
  const highestLastPlayedCard = lastPlayCards.length
    ? lastPlayCards[lastPlayCards.length - 1]
    : 0;

  if (highestLastPlayedCard > highestPlayedCard) {
    return [true, PlayViolationError.SET_TOO_LOW];
  }

  // If we get here, we've passed all of our checks. This move is legal!
  return [true, PlayViolationError.NONE];
}
