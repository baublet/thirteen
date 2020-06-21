import knex from "knex";
import { development, test } from "../knexfile";

export type Connection = knex;

let db: knex;

export async function getConnection(): Promise<Connection> {
  if (!db) {
    if (process.env.NODE_ENV === "test") {
      db = await test.getConnection();
    } else {
      db = await development.getConnection();
    }
  }

  return db;
}
