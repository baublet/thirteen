import { getConnection } from "../../config";
import { create } from "./create";
import { findByIds } from "./find-by-ids";

it("finds all players by the game id", async () => {
  const db = await getConnection("test");
  const player1 = await create({
    db,
    userId: 1,
    gameId: 2,
  });
  const player2 = await create({
    db,
    userId: 2,
    gameId: 2,
  });
  const player3 = await create({
    db,
    userId: 3,
    gameId: 1,
  });

  const result = await findByIds({ db, ids: [2, 1] });

  expect(result).toEqual([player2, player1]);
});
