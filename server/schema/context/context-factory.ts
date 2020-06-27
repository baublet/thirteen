import { Request, Response } from "express";
import { ulid } from "ulid";

import { getConnection, Connection } from "../../config";
import { UserEntity } from "../../data-services";

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
  loaders: any;
  currentUser: Promise<UserEntity | undefined>;
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
    loaders: loadersFactory(connection),
    currentUser: currentUser(req)
  };
}
