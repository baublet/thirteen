import DataLoader from "dataloader";

import { User } from "./index";
import { findById } from "./find-by-id";
import { Transaction } from "../../config";

export function dataLoaderFactory(
  transaction: Transaction
): DataLoader<number, User | null> {
  return new DataLoader((ids) =>
    findById({ ids: ids as number[], transaction })
  );
}
