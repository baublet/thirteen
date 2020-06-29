import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.text("email");
    table.text("providerId").index();
    table.text("provider").index();
    table.text("providerData");
  });

  knex.schema.createTable("games", (table) => {
    table.increments("id").primary();
    table.integer("createdAt").index();
  });

  knex.schema.createTable("gamePlayers", (table) => {
    table.increments("id").primary();
    table.integer("gameId").index();
    table.integer("userId").index();
  });

  return knex.schema.createTable("gameInvitations", (table) => {
    table.increments("id").primary();
    table.integer("createdAt");
    table.integer("gameId").index();
    table.integer("toUserId").index();
    table.integer("fromUserId").index();
    table.text("status").index();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("users");
}
