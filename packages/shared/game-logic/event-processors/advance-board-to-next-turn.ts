import { GameBoard, Player } from "../game";

export default function advanceBoardToNextTurn(gameBoard: GameBoard): void {
  const currentPlayerTurn = gameBoard.playerTurn;
  let currentPlayerIndex: number;
  gameBoard.players.forEach((player: Player, i: number) => {
    if (player.playerId == currentPlayerTurn) {
      currentPlayerIndex = i;
    }
  });
  const currentSet = gameBoard.playedSets[gameBoard.playedSets.length - 1];
  const currentPlayerId = gameBoard.players[currentPlayerIndex].playerId;
  // Find the next player eligible to make a play, or false if there are no
  // more plays to this set
  const nextPlayerTurnIndex: false | number = (() => {
    const potentialPlayers = gameBoard.players.map(
      (player: Player, index: number) => ({ playerId: player.playerId, index })
    );
    // Move all of the elements to the back of the array until the current
    // player is the first element
    while (potentialPlayers[0].playerId !== currentPlayerId) {
      potentialPlayers.push(potentialPlayers.shift());
    }
    // Remove the current user
    potentialPlayers.shift();
    // Loop through!
    while (potentialPlayers.length) {
      // If they have passed this set, let's remove them entirely
      if (
        currentSet.passedPlayerIds.includes(potentialPlayers[0].playerId) ||
        // If they have won, remove them entirely
        gameBoard.winnerPlayerId === potentialPlayers[0].playerId ||
        // If they have lost, remove them entirely
        gameBoard.losingPlayerIds.includes(potentialPlayers[0].playerId)
      ) {
        potentialPlayers.shift();
      }
      return potentialPlayers[0].index;
    }
    return false;
  })();
  if (nextPlayerTurnIndex !== false) {
    gameBoard.playerTurn = gameBoard.players[nextPlayerTurnIndex].playerId;
    return;
  }
  // If we got here, the set is over! There are no more players eligible to make
  // a play.
  gameBoard.playedSets[gameBoard.playedSets.length - 1].open = false;
}