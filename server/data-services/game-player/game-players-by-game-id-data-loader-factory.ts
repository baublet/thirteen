import DataLoader from "dataloader";

import { GamePlayerEntity } from "./index";
import { DatabaseInterface } from "../../config";
import { findByGameIds } from "./find-by-game-ids";

export function gamePlayersByGameIdDataLoaderFactory(
  connection: Promise<DatabaseInterface>
): DataLoader<number, GamePlayerEntity[] | null> {
  return new DataLoader(async (ids) =>
    findByGameIds({ db: await connection, gameIds: ids as number[] })
  );
}
