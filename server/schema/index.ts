import { resolve } from "path";
import { readFile } from "fs";
import { Express } from "express";
import { ApolloServer } from "apollo-server-express";

import { log } from "../utilities";
import { root } from "./resolvers";
import { contextFactory } from "./context";

const schemaFile = resolve(__dirname, "schema.graphql");

export async function createSchema(): Promise<string> {
  return new Promise((resolve, reject) => {
    log.info(`Reading schema from ${schemaFile}`);
    readFile(schemaFile, (err, data) => {
      if (err) return reject(err);
      resolve(data.toString());
    });
  });
}

export async function middleware(app: Express): Promise<void> {
  const typeDefs = await createSchema();
  const playground = Boolean(process.env.GRAPHQL_PLAYGROUND) || true;
  log.info(
    `Starting GQL server ${playground ? "WITH" : "WITHOUT"} GraphQL Playground`
  );
  const server = new ApolloServer({
    typeDefs,
    resolvers: root,
    context: contextFactory,
    playground,
  });
  server.applyMiddleware({ app });
}
