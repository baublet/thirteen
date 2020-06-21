import { resolve } from "path";
import { readFile } from "fs";
import { Express } from "express";
import { buildSchema, GraphQLSchema } from "graphql";
import graphqlHTTP from "express-graphql";

import { log } from "../utilities";
import { root } from "./resolvers";

const schemaFile = resolve(__dirname, "schema.graphql");

export async function createSchema(): Promise<GraphQLSchema> {
  return new Promise((resolve, reject) => {
    log.info(`Reading schema from ${schemaFile}`);
    readFile(schemaFile, (err, data) => {
      if (err) return reject(err);
      const schemaString = data.toString();
      log.info(`Building schema...`);
      const schema = buildSchema(schemaString);
      resolve(schema);
    });
  });
}

export async function middleware(app: Express) {
  const schema = await createSchema();
  const graphiql = Boolean(process.env.GRAPHIQL) || true;
  log.info(
    `Starting GQL server ${graphiql ? "with" : "WITHOUT"} GraphQL explorer`
  );
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql,
    })
  );
}
