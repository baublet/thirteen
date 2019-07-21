var { graphql, buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const resolvers = {
  hello: () => {
    return "Hello world!";
  }
};

export default async function graphqlEntry(
  query,
  context: Record<string, string>
) {
  const response = await graphql(schema, query, resolvers, context);
  return response;
}
