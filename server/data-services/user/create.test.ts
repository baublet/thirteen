import { getConnection } from "../../config";
import { create } from "./create";

it("creates and returns a user", async () => {
  const connection = await getConnection();
  const result = await create({
    transaction: await connection.transaction(),
    email: "test@test.com",
  });
  expect(result.email).toEqual("test@test.com");
});
