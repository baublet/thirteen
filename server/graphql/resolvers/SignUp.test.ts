import SignUp from "./SignUp";
import db from "../../config/db";
import { isResolverError } from ".";

beforeEach(async () => {
  await db.query(`TRUNCATE TABLE users`);
});

it("returns a new user", async () => {
  const signUpPayload = {
    email: "boo@radley.com",
    password: "a!passw0rd here!"
  };
  const register = await SignUp(signUpPayload);
  if (isResolverError(register)) throw register.errorMessage;
  expect(register.email).toEqual(signUpPayload.email);
  expect(register.username).toBeFalsy();
});
