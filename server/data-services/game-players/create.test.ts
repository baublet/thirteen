import { getConnection } from "../../config";
import { create } from "./create";

it("creates and returns a game player", async () => {
  const connection = await getConnection("test");
  const result = await create({
    db: connection,
    userId: 1,
    gameId: 2,
  });
  expect(result.userId).toEqual(1);
  expect(result.gameId).toEqual(2);
});
