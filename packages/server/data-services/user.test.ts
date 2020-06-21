import { getTransaction } from "../config";
import User from "./user";

it("creates and returns a user", async () => {
  const result = await User.create({
    transaction: await getTransaction(),
    email: "test@test.com",
  });
  expect(result.email).toEqual("test@test.com");
});
