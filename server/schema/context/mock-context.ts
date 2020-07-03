import { Context } from "./context-factory";
import { Connection, getConnection } from "../../config/db";
import { dataServices, UserEntity } from "../../data-services";
import { loadersFactory } from "./loaders-factory";

interface MockContextProps {
  overrides?: Partial<Context> & {
    request?: Partial<Context["request"]>;
  };
  currentUser?: UserEntity;
  connection?: Connection;
}

export function createMockContext({
  overrides = {},
  currentUser,
  connection,
}: MockContextProps = {}): Context {
  const db = connection || getConnection("test");
  return {
    currentUser: Promise.resolve(currentUser),
    connection: connection ? Promise.resolve(connection) : db,
    dataServices,
    getLoader: loadersFactory(Promise.resolve(db)),
    ...overrides,
  } as Context;
}
