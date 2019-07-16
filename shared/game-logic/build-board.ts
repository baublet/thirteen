import {
  GameEvent,
  GameBoard,
  GameEventType,
  NewGamePayload,
  PlayPayload,
  NewSetPayload,
  PassPayload
} from "./game";
import advanceBoardToNextTurn from "./event-processors/advance-board-to-next-turn";
import advanceWinner from "./event-processors/advance-winner";
import processNewGame from "./event-processors/process-new-game";
import processNewSet from "./event-processors/process-new-set";
import processPass from "./event-processors/process-pass";
import processPlay from "./event-processors/process-play";

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
        advanceWinner(gameBoard);
        advanceBoardToNextTurn(gameBoard);
        break;
      case GameEventType.PLAY:
        processPlay(event.payload as PlayPayload, gameBoard);
        advanceWinner(gameBoard);
        advanceBoardToNextTurn(gameBoard);
        break;
    }
    existingBoardState.events.push(event);
    existingBoardState.states.push(gameBoard as GameBoard);
  });
  return existingBoardState as GameBoardState;
}
