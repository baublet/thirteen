import { performance } from "perf_hooks";
import knex from "knex";

import { development, test, production } from "../knexfile";
import { log } from "../utilities";

export type Connection = knex;
export type Transaction = knex.Transaction;
export type DatabaseInterface = Connection | Transaction;

let db: DatabaseInterface;

export function getConfigForCurrentEnvironment() {
  if (process.env.NODE_ENV === "test") return test;
  if (process.env.NODE_ENV === "production") return production;
  return development;
}

export async function getConnection(
  requestId: string
): Promise<DatabaseInterface> {
  if (!db) {
    log.info(`Grabbing a database connection for request ID ${requestId}`);
    db = (await getConfigForCurrentEnvironment().getConnection()) as any;
  }

  // const requestQueries = {};

  // db.on("query", (query) => {
  //   const id = query.__knexQueryUid;
  //   requestQueries[id] = { query, startMs: performance.now() };
  // });

  // db.on("query-response", (_: unknown, query) => {
  //   const id = query.__knexQueryUid;
  //   const start = requestQueries[id].startMs;
  //   const end = performance.now();
  //   requestQueries[id].endMs = end;
  //   requestQueries[id].executionMs = Math.ceil(end - start);
  //   log.debug(requestQueries[id]);
  // });

  // db.on("query-error", (_: unknown, query) => {
  //   const id = query.__knexQueryUid;
  //   const start = requestQueries[id].startMs;
  //   const end = performance.now();
  //   requestQueries[id].endMs = end;
  //   requestQueries[id].executionMs = Math.ceil(end - start);
  //   log.error("Query error detected", requestQueries[id]);
  // });

  return db;
}
