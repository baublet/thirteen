import { Request, Response } from "express";
import { ulid } from "ulid";

import { getConnection, Connection } from "../../config";
import { dataServices, UserEntity } from "../../data-services";

import { loadersFactory } from "./loaders-factory";
import { currentUser } from "./current-user";

export interface Context {
  request: {
    id: string;
    headers: Record<string, string | string[] | undefined>;
    host: string;
    protocol: string;
  };
  response: Response;
  connection: Promise<Connection>;
  getLoader: ReturnType<typeof loadersFactory>;
  currentUser: Promise<UserEntity | undefined>;
  dataServices: typeof dataServices;
}

export function contextFactory({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Context {
  const requestId = ulid();
  const connection: Promise<Connection> = getConnection(requestId);

  return {
    request: {
      id: requestId,
      headers: req.headers,
      host: req.hostname,
      protocol: req.protocol,
    },
    response: res,
    connection,
    getLoader: loadersFactory(connection),
    currentUser: currentUser(req, connection),
    dataServices,
  };
}
