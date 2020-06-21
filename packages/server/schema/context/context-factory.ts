import { Request, Response } from "express";
import { ulid } from "ulid";

import { getConnection, Connection } from "../../config";
import { log } from "../../utilities";

export interface Context {
  request: {
    id: string;
    headers: Record<string, string | string[] | undefined>;
    host: string;
    protocol: string;
  };
  response: Response;
  getConnection: () => Promise<Connection>;
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
  return {
    request: {
      id: requestId,
      headers: req.headers,
      host: req.hostname,
      protocol: req.protocol,
    },
    response: res,
    getConnection: async () => {
      if (!connection) {
        log.info(`Providing DB connection for request ID ${requestId}`);
        connection = await getConnection();
      }
      return connection;
    },
  };
}
