import { getConnection } from "../../config";
import { create } from "./create";

it("creates and returns a game", async () => {
  const db = await getConnection("test");
  
  const result = await create({ db, toUserId: 1, fromUserId: 2, gameId: 3 });

  expect(typeof result.toUserId).toBe(1);
  expect(typeof result.fromUserId).toBe(2);
  expect(typeof result.gameId).toBe(3);
});
