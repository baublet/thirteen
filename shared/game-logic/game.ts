export enum Card {
  CLUBS_3 = 100,
  CLUBS_4 = 110,
  CLUBS_5 = 120,
  CLUBS_6 = 130,
  CLUBS_7 = 140,
  CLUBS_8 = 150,
  CLUBS_9 = 160,
  CLUBS_10 = 170,
  CLUBS_JACK = 180,
  CLUBS_QUEEN = 190,
  CLUBS_KING = 192,
  CLUBS_ACE = 194,
  CLUBS_2 = 196,

  SPADES_3 = 200,
  SPADES_4 = 210,
  SPADES_5 = 220,
  SPADES_6 = 230,
  SPADES_7 = 240,
  SPADES_8 = 250,
  SPADES_9 = 260,
  SPADES_10 = 270,
  SPADES_JACK = 280,
  SPADES_QUEEN = 290,
  SPADES_KING = 292,
  SPADES_ACE = 294,
  SPADES_2 = 296,

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
  players: [Player, Player, Player, Player];
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
  currentSet: undefined | Set;
  playedSets: PlayedSet[];
  players: [Player, Player, Player, Player];
  playerTurn: number;
}
