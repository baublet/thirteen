import { getConnection } from "../../config";
import { create } from "./create";
import { accept } from "./accept";

it("accepts a game invitation", async () => {
  const db = await getConnection("test");
  await create({
    db,
    gameId: 1,
    fromUserId: 2,
    toUserId: 3,
  });
  const invitation = await create({
    db,
    gameId: 2,
    fromUserId: 3,
    toUserId: 4,
  });

  const result = await accept({ db, invitationId: invitation.id });
  expect(result.status).toEqual("accepted");
});
