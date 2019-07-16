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
import advanceBoardToNextTurn from "./event-processors/advance-board-to-next-turn";

const deepClone = require("lodash.clonedeep");

interface GameBoardState {
  states: GameBoard[];
  events: GameEvent[];
}

export const blankBoard = (): GameBoard => ({
  id: undefined,
  losingPlayerIds: [],
  playedSets: [],
  players: [],
  playerTurn: undefined,
  winnerPlayerId: undefined
});

export const blankBoardState = (): GameBoardState => ({
  states: [blankBoard()],
  events: []
});

export default function buildBoard(
  gameEvents: GameEvent[],
  existingBoardState: GameBoardState = blankBoardState()
): GameBoardState {
  gameEvents.forEach(event => {
    const gameBoard: GameBoard = deepClone(
      existingBoardState.states[existingBoardState.states.length - 1]
    );
    switch (event.type) {
      case GameEventType.NEW_GAME:
        processNewGame(event.payload as NewGamePayload, gameBoard);
        break;
      case GameEventType.NEW_SET:
        processNewSet(event.payload as NewSetPayload, gameBoard);
        break;
      case GameEventType.PASS:
        processPass(event.payload as PassPayload, gameBoard);
        advanceBoardToNextTurn(gameBoard);
        break;
      case GameEventType.PLAY:
        processPlay(event.payload as PlayPayload, gameBoard);
        advanceWinnerIfApplicable(gameBoard);
        advanceBoardToNextTurn(gameBoard);
        break;
    }
    existingBoardState.events.push(event);
    existingBoardState.states.push(gameBoard as GameBoard);
  });
  return existingBoardState as GameBoardState;
}

export function processNewGame(
  eventPayload: NewGamePayload,
  gameBoard: GameBoard
): void {
  gameBoard.players = eventPayload.players;
  gameBoard.playerTurn = gameBoard.players[0].playerId;
  gameBoard.losingPlayerIds = [];
}

export function processPlay(
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

export function processNewSet(
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

export function processPass(
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

export function advanceWinnerIfApplicable(gameBoard: GameBoard): boolean {
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
