import { PingResponse } from "./ping-response";
import { resolveGameEventType } from "./game-event";
import { games } from "./query/games";
import { currentUser } from "./current-user";
import { Game } from "./game";
import { createGame } from "./create-game";

export interface PageInfo {
  totalCount: number;
  hasMore: boolean;
}

export interface GameGqlType {}

export interface GameConnectionPartial {
  pageInfo: PageInfo;
  nodes: () => Promise<GameGqlType[]>;
}

export const root = {
  Game,
  GameEvent: {
    __resolveType: resolveGameEventType,
  },
  PingResponse,
  Mutation: {
    createGame,
  },
  Query: {
    ping: () => ({}),
    games,
    currentUser,
  },
};
