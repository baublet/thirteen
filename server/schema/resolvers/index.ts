import { PingResponse } from "./ping-response";
import { resolveGameEventType } from "./game-event";
import { games } from "./query/games";
import { currentUser } from "./current-user";

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
  GameEvent: {
    __resolveType: resolveGameEventType,
  },
  PingResponse,
  Query: {
    ping: () => ({}),
    games,
    currentUser,
  },
};
