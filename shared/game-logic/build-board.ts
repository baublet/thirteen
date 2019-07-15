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
  NewSetPayload
} from "./game";

interface GameBoardInTransit {
  id?: number;
  currentSet?: undefined | Set;
  playedSets?: PlayedSet[];
  players?: [] | [Player, Player, Player, Player];
  playerTurn?: number;
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
      case GameEventType.NEW_SET:
        processNewSet(event.payload as NewSetPayload, gameBoard);
      case GameEventType.PLAY:
        processPlay(event.payload as PlayPayload, gameBoard);
        advanceBoardToNextTurn(gameBoard);
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
    set: eventPayload.set,
    plays: []
  });
}

export function advanceBoardToNextTurn(gameBoard: GameBoardInTransit): void {
  const currentPlayerTurn = gameBoard.playerTurn;
  let currentPlayerIndex: number;
  gameBoard.players.forEach((player: Player, i: number) => {
    if (player.playerId == currentPlayerTurn) {
      currentPlayerIndex = i;
    }
  });
  const nextPlayerTurnIndex =
    currentPlayerIndex == 3 ? 0 : currentPlayerIndex + 1;
  gameBoard.playerTurn = gameBoard.players[nextPlayerTurnIndex].playerId;
}
