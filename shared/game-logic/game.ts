export enum Card {
  CLUBS_3 = 0,
  CLUBS_4 = 10,
  CLUBS_5 = 20,
  CLUBS_6 = 30,
  CLUBS_7 = 40,
  CLUBS_8 = 50,
  CLUBS_9 = 60,
  CLUBS_10 = 70,
  CLUBS_JACK = 80,
  CLUBS_QUEEN = 90,
  CLUBS_KING = 100,
  CLUBS_ACE = 110,
  CLUBS_2 = 120,

  SPADES_3 = 130,
  SPADES_4 = 140,
  SPADES_5 = 150,
  SPADES_6 = 160,
  SPADES_7 = 170,
  SPADES_8 = 180,
  SPADES_9 = 190,
  SPADES_10 = 200,
  SPADES_JACK = 210,
  SPADES_QUEEN = 220,
  SPADES_KING = 230,
  SPADES_ACE = 240,
  SPADES_2 = 250,

  DIAMONDS_3 = 300,
  DIAMONDS_4 = 310,
  DIAMONDS_5 = 320,
  DIAMONDS_6 = 330,
  DIAMONDS_7 = 340,
  DIAMONDS_8 = 350,
  DIAMONDS_9 = 360,
  DIAMONDS_10 = 370,
  DIAMONDS_JACK = 380,
  DIAMONDS_QUEEN = 390,
  DIAMONDS_KING = 392,
  DIAMONDS_ACE = 394,
  DIAMONDS_2 = 396,

  HEARTS_3 = 400,
  HEARTS_4 = 410,
  HEARTS_5 = 420,
  HEARTS_6 = 430,
  HEARTS_7 = 440,
  HEARTS_8 = 450,
  HEARTS_9 = 460,
  HEARTS_10 = 470,
  HEARTS_JACK = 480,
  HEARTS_QUEEN = 490,
  HEARTS_KING = 492,
  HEARTS_ACE = 494,
  HEARTS_2 = 496
}

export enum Set {
  ONE = "single",
  TWO = "pair",
  THREE = "three",
  FOUR = "four",
  RUN = "run",
  DOUBLE_RUN = "double_run",
  TRIPLE_RUN = "triple_run",
  QUADRUPLE_RUN = "quadruple_run"
}

export enum Bomb {
  FOUR = Set.FOUR,
  DOUBLE_RUN = Set.DOUBLE_RUN,
  TRIPLE_RUN = Set.TRIPLE_RUN,
  QUADRUPLE_RUN = Set.QUADRUPLE_RUN
}

export interface Play {
  cards: Card[];
  playerId: number;
}

export interface PlayedSet {
  open: boolean;
  passedPlayerIds: number[];
  plays: Play[];
  set: Set;
}

export type Hand = Card[];

export enum GameEventType {
  CONCEDE = "concede",
  GAME_OVER = "game_over",
  NEW_GAME = "new_game",
  NEW_SET = "new_set",
  PASS = "pass",
  PLAY = "play"
}

export interface ConcedePayload {
  playerId: number;
}

export interface NewGamePayload {
  players: Player[];
}

export interface GameOverPayload {
  losers: [number, number, number];
  winner: number;
}

export interface NewSetPayload {
  set: Set;
}

export type PassPayload = ConcedePayload;

export interface PlayPayload {
  playerId: number;
  cards: Card[];
}

type GamePayloads =
  | ConcedePayload
  | GameOverPayload
  | NewGamePayload
  | NewSetPayload
  | PassPayload
  | PlayPayload;

export interface GameEvent {
  createdAt: number;
  payload: GamePayloads;
  type: GameEventType;
}

export interface Player {
  playerId: number;
  hand: Hand;
}

export interface GameBoard {
  id: number;
  playedSets: PlayedSet[];
  players: Player[];
  winnerPlayerId: undefined | number;
  losingPlayerIds: number[];
  playerTurn: number;
}
