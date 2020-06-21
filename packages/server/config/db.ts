import knex from "knex";
import { development, test } from "../knexfile";

export type Connection = knex;
export type Transaction = knex.Transaction;

let db: knex;

export function getConfigForCurrentEnvironment() {
  if (process.env.NODE_ENV === "test") return test;
  return development;
}

export async function getConnection(): Promise<Connection> {
  if (!db) {
    db = await getConfigForCurrentEnvironment().getConnection();
  }

  return db;
}

/**
 * Grabs a transaction
 */
export async function getTransaction(): Promise<Transaction> {
  const connection = await getConnection();
  return connection.transaction();
}
