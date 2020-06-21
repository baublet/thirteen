import { graphql, buildSchema } from "graphql";

export default buildSchema(`
type User {
  id: ID,
  email: String,
  password: String
}

type Query {
  hello: String,
}

type Mutation {
  SignUp(email: String!, password: String!): User
  SignIn(email: String!, password: String!): Boolean
}
`);
