import DataLoader from "dataloader";

import { GameEntity } from "./index";
import { findById } from "./find-by-id";
import { Connection } from "../../config";

export function dataLoaderFactory(
  connection: Promise<Connection>
): DataLoader<number, GameEntity | null> {
  return new DataLoader(async (ids) =>
    findById({ ids: ids as number[], db: await connection })
  );
}
