import { getConnection } from "../../config";
import { create } from "./create";
import { findByGameIds } from "./find-by-game-ids";

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

  const result = await findByGameIds({ db, gameIds: [2, 1] });

  expect(result).toEqual([[player1, player2], [player3]]);
});
