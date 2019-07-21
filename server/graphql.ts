import handlerFactory from "./handlerFactory";
import graphql from "./graphql/entry";

exports.handler = handlerFactory(async event => ({
  isBase64Encoded: false,
  body: await graphql(event.body, {
    ...event.headers
  }),
  headers: {},
  statusCode: 200
}));
