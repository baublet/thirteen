import { getConnection } from "../../config";
import { create } from "./create";
import { findByToUserId } from "./find-by-to-user-id";

it("finds all players by the game id", async () => {
  const db = await getConnection("test");
  await create({
    db,
    gameId: 1,
    fromUserId: 2,
    toUserId: 3,
  });
  const invitation2 = await create({
    db,
    gameId: 2,
    fromUserId: 3,
    toUserId: 4,
  });

  const result = await findByToUserId({ db, toUserId: 4 });

  expect(result).toEqual([invitation2]);
});
