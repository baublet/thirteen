import { create } from "./create";

export const tableName: string = "games";

export interface GameEntity {
  id: number;
  createdAt: number;
}

export const Game = { create };
