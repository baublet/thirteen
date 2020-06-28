import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.text("email");
    table.text("providerId").index();
    table.text("provider").index();
    table.text("providerData");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("users");
}
