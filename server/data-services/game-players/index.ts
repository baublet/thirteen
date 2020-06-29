import { create } from "./create";
import { findByGameId } from "./find-by-game-id";
import { findDistinctGameIdsByUserId } from "./find-distinct-game-ids-by-user-id";

export const tableName: string = "gamePlayers";

export interface GamePlayerEntity {
  id: number;
  gameId: number;
  userId: number;
}

export const User = {
  tableName,
  create,
  findByGameId,
  findDistinctGameIdsByUserId,
};
