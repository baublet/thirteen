import DataLoader from "dataloader";

import { User } from "./index";
import { findById } from "./find-by-id";
import { Connection } from "../../config";

export function dataLoaderFactory(
  getConnection: () => Promise<Connection>
): DataLoader<number, User | null> {
  return new DataLoader(async (ids) =>
    findById({ ids: ids as number[], connection: await getConnection() })
  );
}
