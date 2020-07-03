import { create } from "./create";
import { findByOwnerUserId } from "./find-by-owner-user-id";
import { dataLoaderFactory } from "./data-loader-factory";
import { findById } from "./find-by-id";

export const tableName: string = "games";

export interface GameEntity {
  id: number;
  createdAt: number;
  ownerUserId: number;
}

export const Game = { create, findByOwnerUserId, findById, dataLoaderFactory };
