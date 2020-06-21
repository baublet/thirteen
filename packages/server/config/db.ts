import knex from "knex";
import { development, test, production } from "../knexfile";

export type Connection = knex;
export type Transaction = knex.Transaction;

let db: knex;

export function getConfigForCurrentEnvironment() {
  if (process.env.NODE_ENV === "test") return test;
  if (process.env.NODE_ENV === "production") return production;
  return development;
}

export async function getConnection(): Promise<Connection> {
  if (!db) {
    db = await getConfigForCurrentEnvironment().getConnection();
  }

  return db;
}
