import { graphql } from "graphql";
import resolvers from "./resolvers";
import schema from "./schema";

export default async function graphqlEntry(
  query,
  context: Record<string, string>
) {
  const response = await graphql(schema, query, resolvers, context);
  return response;
}
