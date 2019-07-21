import { Set, Player, Card, GameBoard } from "../game";
import { blankBoard } from "../build-board";
import allowPlay, { PlayViolationError } from "./allow-play";

let id = 0;

const player = (): Player => {
  return {
    playerId: id++,
    hand: [Card.CLUBS_3]
  };
};

let board: GameBoard;

const testPlay = (cards: Card[], set: Set, boardState: GameBoard) => {
  const board: GameBoard = JSON.parse(JSON.stringify(boardState));
  board.playedSets[board.playedSets.length - 1].set = set;
  const [allowed, violation] = allowPlay(
    {
      cards,
      playerId: board.players[0].playerId
    },
    board
  );
  expect(violation).toBe(PlayViolationError.NONE);
  expect(allowed).toBeTruthy();
};

beforeEach(() => {
  const players: Player[] = [player(), player(), player(), player()];
  board = blankBoard();
  board.players = players;
  board.playerTurn = players[0].playerId;
  board.playedSets = [
    {
      set: Set.ONE,
      open: true,
      plays: [],
      passedPlayerIds: []
    }
  ];
});

it("does not allow a play when it's not their turn", () => {
  const [allowed, violation] = allowPlay(
    {
      cards: [Card.CLUBS_10, Card.CLUBS_3],
      playerId: board.players[1].playerId
    },
    board
  );
  expect(violation).toBe(PlayViolationError.NOT_YOUR_TURN);
  expect(allowed).toBeFalsy();
});

it("allows a play on their turn", () => {
  const [allowed, violation] = allowPlay(
    {
      cards: [Card.CLUBS_3],
      playerId: board.players[0].playerId
    },
    board
  );
  expect(violation).toBe(PlayViolationError.NONE);
  expect(allowed).toBeTruthy();
});

it("allows any legal play", () => {
  testPlay([Card.CLUBS_3], Set.ONE, board);
  testPlay([Card.CLUBS_3, Card.SPADES_3], Set.TWO, board);
  testPlay([Card.CLUBS_3, Card.SPADES_3, Card.HEARTS_3], Set.THREE, board);
  testPlay(
    [Card.CLUBS_3, Card.SPADES_3, Card.HEARTS_3, Card.DIAMONDS_3],
    Set.FOUR,
    board
  );
  testPlay([Card.CLUBS_3, Card.SPADES_4, Card.HEARTS_5], Set.RUN, board);
  testPlay(
    [Card.CLUBS_3, Card.SPADES_4, Card.HEARTS_5, Card.HEARTS_6],
    Set.RUN,
    board
  );
  testPlay(
    [Card.CLUBS_3, Card.SPADES_4, Card.HEARTS_5, Card.HEARTS_6, Card.HEARTS_7],
    Set.RUN,
    board
  );
  testPlay(
    [
      Card.CLUBS_3,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.HEARTS_6,
      Card.HEARTS_7,
      Card.HEARTS_8
    ],
    Set.RUN,
    board
  );
  testPlay(
    [
      Card.CLUBS_3,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.HEARTS_6,
      Card.HEARTS_7,
      Card.HEARTS_8,
      Card.HEARTS_9
    ],
    Set.RUN,
    board
  );
  testPlay(
    [
      Card.CLUBS_3,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.HEARTS_6,
      Card.HEARTS_7,
      Card.HEARTS_8,
      Card.HEARTS_9,
      Card.HEARTS_10
    ],
    Set.RUN,
    board
  );
  testPlay(
    [
      Card.CLUBS_3,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.HEARTS_6,
      Card.HEARTS_7,
      Card.HEARTS_8,
      Card.HEARTS_9,
      Card.HEARTS_10,
      Card.HEARTS_JACK
    ],
    Set.RUN,
    board
  );
  testPlay(
    [
      Card.CLUBS_3,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.HEARTS_6,
      Card.HEARTS_7,
      Card.HEARTS_8,
      Card.HEARTS_9,
      Card.HEARTS_10,
      Card.HEARTS_JACK,
      Card.HEARTS_QUEEN
    ],
    Set.RUN,
    board
  );
  testPlay(
    [
      Card.CLUBS_3,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.HEARTS_6,
      Card.HEARTS_7,
      Card.HEARTS_8,
      Card.HEARTS_9,
      Card.HEARTS_10,
      Card.HEARTS_JACK,
      Card.HEARTS_QUEEN,
      Card.HEARTS_KING
    ],
    Set.RUN,
    board
  );
  testPlay(
    [
      Card.CLUBS_3,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.HEARTS_6,
      Card.HEARTS_7,
      Card.HEARTS_8,
      Card.HEARTS_9,
      Card.HEARTS_10,
      Card.HEARTS_JACK,
      Card.HEARTS_QUEEN,
      Card.HEARTS_KING,
      Card.HEARTS_ACE
    ],
    Set.RUN,
    board
  );
});

it("does a multirun", () => {
  testPlay(
    [
      Card.CLUBS_3,
      Card.SPADES_3,
      Card.HEARTS_4,
      Card.SPADES_4,
      Card.HEARTS_5,
      Card.SPADES_5
    ],
    Set.MULTI_RUN,
    board
  );
})