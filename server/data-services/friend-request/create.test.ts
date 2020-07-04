import { getConnection } from "../../config";
import { create } from "./create";

it("creates and returns a game", async () => {
  const db = await getConnection("test");
  
  const result = await create({ db, fromUserId: 1, toUserId: 2 });

  expect(typeof result.createdAt).toBe("string");
  expect(result.fromUserId).toBe(1);
  expect(result.toUserId).toBe(2);
});
