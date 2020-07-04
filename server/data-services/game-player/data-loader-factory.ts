import DataLoader from "dataloader";

import { GamePlayerEntity } from "./index";
import { findByIds } from "./find-by-ids";
import { Connection } from "../../config";

export function dataLoaderFactory(
  connection: Promise<Connection>
): DataLoader<number, GamePlayerEntity | null> {
  return new DataLoader(async (ids) =>
    findByIds({ ids: ids as number[], db: await connection })
  );
}
