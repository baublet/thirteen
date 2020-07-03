import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.integer("createdAt").defaultTo(knex.fn.now());
    table.text("providerId").index();
    table.text("provider").index();
    table.text("providerData");
  });

  await knex.schema.createTable("games", (table) => {
    table.increments("id").primary();
    table.integer("createdAt").defaultTo(knex.fn.now());
    table.integer("ownerUserId").index();
  });

  await knex.schema.createTable("gamePlayers", (table) => {
    table.increments("id").primary();
    table.integer("gameId").index();
    table.integer("userId").index();
  });

  return knex.schema.createTable("gameInvitations", (table) => {
    table.increments("id").primary();
    table.integer("createdAt").defaultTo(knex.fn.now());
    table.integer("gameId").index();
    table.integer("toUserId").index();
    table.integer("fromUserId").index();
    table.text("status").index();
  });
}

export async function down(knex: Knex): Promise<any> {
  // No down migrations ever allowed
}
