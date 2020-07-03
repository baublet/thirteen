import DataLoader from "dataloader";

import { Connection } from "../../config";
import { User, Game } from "../../data-services";

const dataLoaders = {
  user: User.dataLoaderFactory,
  game: Game.dataLoaderFactory,
};

type DataLoaderFactory = (
  connection: Promise<Connection>
) => DataLoader<any, any>;
type Loaders = typeof dataLoaders;
type GetLoadersFunction = <K extends keyof Loaders>(
  k: K
) => ReturnType<Loaders[K]>;

export function loadersFactory(
  connection: Promise<Connection>
): GetLoadersFunction {
  const loaders: Record<string, DataLoader<any, any>> = {};

  function getLoader(
    loader: keyof Loaders,
    dataLoaderFactory: DataLoaderFactory
  ): DataLoader<any, any> {
    if (!loaders[loader]) loaders[loader] = dataLoaderFactory(connection);
    return loaders[loader];
  }

  return function <K extends keyof Loaders>(key: K): ReturnType<Loaders[K]> {
    if (!loaders[key]) {
      if (!dataLoaders[key]) {
        throw new Error(`Unknown data loader requested: ${key}`);
      }
      const dataLoaderFactory = dataLoaders[key];
      loaders[key] = getLoader(key, dataLoaderFactory);
    }
    return loaders[key] as ReturnType<Loaders[K]>;
  };
}
