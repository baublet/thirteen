import { getConnection } from "../../config";
import { create } from "./create";
import { findDistinctGameIdsByUserId } from "./find-distinct-game-ids-by-user-id";

it("finds all players by the user id", async () => {
  const db = await getConnection("test");
  await create({
    db,
    userId: 1,
    gameId: 2,
  });
  await create({
    db,
    userId: 2,
    gameId: 2,
  });
  await create({
    db,
    userId: 3,
    gameId: 2,
  });

  const result = await findDistinctGameIdsByUserId({ db, userIds: [2, 3] });

  expect(result).toEqual([[2], [2]]);
});
