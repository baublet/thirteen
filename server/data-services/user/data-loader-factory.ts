import DataLoader from "dataloader";

import { UserEntity } from "./index";
import { findById } from "./find-by-id";
import { Connection } from "../../config";

export function dataLoaderFactory(
  connection: Promise<Connection>
): DataLoader<number, UserEntity | null> {
  return new DataLoader(async (ids) =>
    findById({ ids: ids as number[], db: await connection })
  );
}
