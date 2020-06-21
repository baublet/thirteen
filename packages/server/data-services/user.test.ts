import { getConnection } from "../config";
import User from "./user";

it("creates and returns a user", async () => {
  const result = await User.create({
    connection: await getConnection(),
    email: "test@test.com"
  });
  expect(result).toEqual(1);
});
