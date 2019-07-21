import graphqlEntry from "./entry";

it("passes a sanity test for the gql server", async () => {
  const response = await graphqlEntry("{ hello }", {});
  expect(typeof response).toBe("object");
  expect(response).toEqual({ data: { hello: "Hello world!" } });
});
