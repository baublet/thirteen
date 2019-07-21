import UserModel from "./user";
import db from "../config/db";
import { isModelError } from ".";

beforeEach(async () => {
  await db.query(`TRUNCATE TABLE users CASCADE`);
});

it("creates and reads a user", async () => {
  const user = await UserModel.create({
    email: "jonathan@van.ness.com",
    passwordHash: "some random password",
    displayName: "JONATHAN!"
  });
  if (isModelError(user)) throw `Error creating a user: ${user.errorMessage}`;
  expect(user.email).toBe("jonathan@van.ness.com");

  const userFromDb = await UserModel.findById({ id: user.id });
  if (isModelError(userFromDb))
    throw `Error creating a user: ${userFromDb.errorMessage}`;
  expect(userFromDb.email).toEqual(user.email);
  expect(userFromDb.displayName).toEqual(user.displayName);
});

it("reads users", async () => {
  const user1 = await UserModel.create({
    email: "jonathan@van.ness.com",
    passwordHash: "some random password",
    displayName: "JONATHAN!"
  });

  const user2 = await UserModel.create({
    email: "jonathan2@van.ness.com",
    passwordHash: "some random password",
    displayName: "JONATHAN!"
  });

  if (isModelError(user1) || isModelError(user2))
    throw `Error creating a user...`;

  const users = await UserModel.findByIds({ ids: [user1.id, user2.id] });
  // @ts-ignore
  expect(users[0].id).toBe(user1.id);
  // @ts-ignore
  expect(users[1].id).toBe(user2.id);
});
