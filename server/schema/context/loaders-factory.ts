import DataLoader from "dataloader";

import { Connection } from "../../config";
import { User } from "../../data-services";

export interface Loaders {
  user: () => DataLoader<number, typeof User>;
}

type DataService = typeof User;

export function loadersFactory(
  connection: Promise<Connection>
): Loaders {
  const loaders: Record<string, any> = {};

  function getLoader<T extends DataService>(
    loader: string,
    service: T
  ): DataLoader<number, T> {
    if (!loaders[loader])
      loaders[loader] = service.dataLoaderFactory(connection);
    return loaders[loader];
  }

  return {
    user: () => getLoader<typeof User>("user", User),
  };
}
