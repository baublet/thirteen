import { GraphQLScalarType } from "graphql";

import { PingResponse } from "./ping-response";
import { resolveGameEventType } from "./game-event";
import { games } from "./query/games";
import { currentUser } from "./current-user";
import { createGame } from "./create-game";

import { Game } from "./game";
import { GamePlayer } from "./game-player";
import { User } from "./user";

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
  ID: new GraphQLScalarType({
    name: "ID",
    description: "Custom ID type",
    serialize(value) {
      return parseInt(value, 10);
    },
  }),
  Game,
  GamePlayer,
  GameEvent: {
    __resolveType: resolveGameEventType,
  },
  PingResponse,
  User,
  Mutation: {
    createGame,
  },
  Query: {
    ping: () => ({}),
    games,
    currentUser,
  },
};
