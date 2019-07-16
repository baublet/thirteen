import {
  GameEvent,
  GameBoard,
  GameEventType,
  NewGamePayload,
  PlayedSet,
  Set,
  Player,
  PlayPayload,
  Card,
  NewSetPayload,
  PassPayload
} from "./game";

interface GameBoardInTransit {
  id?: number;
  losingPlayerIds?: number[];
  playedSets?: PlayedSet[];
  players?: Player[];
  playerTurn?: number;
  winnerPlayerId?: number;
}

export default function buildBoard(
  gameEvents: GameEvent[],
  existingBoard: GameBoard | object = {}
): GameBoard {
  const gameBoard: GameBoardInTransit = existingBoard;
  gameEvents.forEach(event => {
    switch (event.type) {
      case GameEventType.NEW_GAME:
        processNewGame(event.payload as NewGamePayload, gameBoard);
        return;
      case GameEventType.NEW_SET:
        processNewSet(event.payload as NewSetPayload, gameBoard);
        return;
      case GameEventType.PASS:
        processPass(event.payload as PassPayload, gameBoard);
        advanceBoardToNextTurn(gameBoard);
        return;
      case GameEventType.PLAY:
        processPlay(event.payload as PlayPayload, gameBoard);
        advanceWinnerIfApplicable(gameBoard);
        advanceBoardToNextTurn(gameBoard);
        return;
    }
  });
  return gameBoard as GameBoard;
}

export function processNewGame(
  eventPayload: NewGamePayload,
  gameBoard: GameBoardInTransit
): void {
  gameBoard.players = eventPayload.players;
  gameBoard.playerTurn = gameBoard.players[0].playerId;
  gameBoard.losingPlayerIds = [];
}

export function processPlay(
  eventPayload: PlayPayload,
  gameBoard: GameBoardInTransit
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

export function processNewSet(
  eventPayload: NewSetPayload,
  gameBoard: GameBoardInTransit
): void {
  gameBoard.playedSets = gameBoard.playedSets || [];
  gameBoard.playedSets.push({
    open: true,
    passedPlayerIds: [],
    plays: [],
    set: eventPayload.set
  });
}

export function processPass(
  eventPayload: PassPayload,
  gameBoard: GameBoardInTransit
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

export function advanceBoardToNextTurn(gameBoard: GameBoardInTransit): void {
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

export function advanceWinnerIfApplicable(
  gameBoard: GameBoardInTransit
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
