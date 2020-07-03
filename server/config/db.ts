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

  return db;
}
