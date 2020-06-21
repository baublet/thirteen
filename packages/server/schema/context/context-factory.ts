import { Request, Response } from "express";
import { ulid } from "ulid";

import { getConnection, Connection } from "../../config";
import { log } from "../../utilities";

import { loadersFactory, Loaders } from "./loaders-factory";

export interface Context {
  request: {
    id: string;
    headers: Record<string, string | string[] | undefined>;
    host: string;
    protocol: string;
  };
  response: Response;
  getConnection: () => Promise<Connection>;
  loaders: Loaders;
}

export function contextFactory({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Context {
  const requestId = ulid();
  let connection: Connection;

  const getDbConnection = async () => {
    if (!connection) {
      log.info(`Providing DB connection for request ID ${requestId}`);
      connection = await getConnection();
    }
    return connection;
  };

  return {
    request: {
      id: requestId,
      headers: req.headers,
      host: req.hostname,
      protocol: req.protocol,
    },
    response: res,
    getConnection: getDbConnection,
    loaders: loadersFactory(getDbConnection),
  };
}
