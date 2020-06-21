import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  knex.schema.createSchemaIfNotExists('thirteen')
}


export async function down(knex: Knex): Promise<any> {
  knex.schema.dropSchemaIfExists('thirteen')
}
