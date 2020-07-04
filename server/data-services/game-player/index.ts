import { create } from "./create";
import { findByGameId } from "./find-by-game-id";
import { findDistinctGameIdsByUserId } from "./find-distinct-game-ids-by-user-id";
import { findByGameIds } from "./find-by-game-ids";
import { gamePlayersByGameIdDataLoaderFactory } from "./game-players-by-game-id-data-loader-factory";
import { findByIds } from "./find-by-ids";
import { dataLoaderFactory } from "./data-loader-factory";

export const tableName: string = "gamePlayers";

export interface GamePlayerEntity {
  id: number;
  gameId: number;
  userId: number;
}

export const GamePlayer = {
  create,
  dataLoaderFactory,
  findByGameId,
  findByGameIds,
  findByIds,
  findDistinctGameIdsByUserId,
  gamePlayersByGameIdDataLoaderFactory,
  tableName,
};
