import buildBoard, {
  advanceWinnerIfApplicable,
  advanceBoardToNextTurn,
  processNewGame,
  processNewSet,
  processPlay
} from "./build-board";
import { Player, Set, Card, GameEventType } from "./game";

let id = 0;

const player = (): Player => {
  return {
    playerId: id++,
    hand: [Card.CLUBS_3]
  };
};

const players: Player[] = [player(), player(), player(), player()];

it("builds a board via a series of events", () => {
  buildBoard([
    {
      type: GameEventType.NEW_GAME,
      createdAt: 1,
      payload: {
        players
      }
    },
    {
      type: GameEventType.NEW_SET,
      createdAt: 2,
      payload: {
        set: Set.ONE
      }
    },
    {
      type: GameEventType.PLAY,
      createdAt: 3,
      payload: {
        playerId: players[0].playerId,
        cards: [Card.CLUBS_3]
      }
    },
    {
      type: GameEventType.PASS,
      createdAt: 4,
      payload: {
        playerId: players[1].playerId
      }
    }
  ]);
});

it("process a new game event", () => {
  const board = {};
  processNewGame({ players }, board);
  // @ts-ignore
  expect(board.players.length).toBe(4);
  // @ts-ignore
  expect(board).toEqual({
    players,
    playerTurn: players[0].playerId,
    losingPlayerIds: []
  });
});

it("advances a game board to the next turn", () => {
  const board = {
    losingPlayerIds: [],
    players,
    playerTurn: players[0].playerId,
    playedSets: [
      {
        set: Set.ONE,
        open: true,
        plays: [],
        passedPlayerIds: []
      }
    ]
  };
  advanceBoardToNextTurn(board);
  expect(board.playerTurn).toBe(players[1].playerId);
  advanceBoardToNextTurn(board);
  expect(board.playerTurn).toBe(players[2].playerId);
  advanceBoardToNextTurn(board);
  expect(board.playerTurn).toBe(players[3].playerId);
  advanceBoardToNextTurn(board);
  expect(board.playerTurn).toBe(players[0].playerId);
});

it("processes a new set", () => {
  const board = {
    players,
    playerTurn: players[0].playerId
  };
  processNewSet(
    {
      set: Set.TWO
    },
    board
  );
  // @ts-ignore
  expect(board.playedSets[board.playedSets.length - 1].set).toBe(Set.TWO);
});

it("processes a new play", () => {
  const board = {
    players,
    playerTurn: players[0].playerId
  };
  processNewSet(
    {
      set: Set.TWO
    },
    board
  );
  // @ts-ignore
  expect(board.playedSets[board.playedSets.length - 1].set).toBe(Set.TWO);
  // @ts-ignore
  expect(board.playedSets[board.playedSets.length - 1].open).toBeTruthy();
  processPlay(
    {
      cards: [Card.CLUBS_10, Card.CLUBS_3],
      playerId: board.players[0].playerId
    },
    board
  );
  // @ts-ignore
  expect(board.playedSets[board.playedSets.length - 1].plays.length).toBe(1);
  expect(
    // @ts-ignore
    board.playedSets[board.playedSets.length - 1].plays[0].cards.length
  ).toBe(2);
});

it("sets a winner if there is a winner", () => {
  const board = {
    winnerPlayerId: undefined,
    players: [
      player(),
      player(),
      player(),
      {
        playerId: id++,
        hand: []
      }
    ],
    playerTurn: players[0].playerId
  };
  advanceWinnerIfApplicable(board);
  expect(board.winnerPlayerId).toBe(board.players[3].playerId);
});
