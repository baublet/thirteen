import { getConnection } from "../../config";
import { create } from "./create";

it("creates and returns a game", async () => {
  const db = await getConnection("test");
  const result = await create({ db, ownerUserId: 1 });
  expect(typeof result.createdAt).toBe("number");
  expect(result.ownerUserId).toBe(1);
});
