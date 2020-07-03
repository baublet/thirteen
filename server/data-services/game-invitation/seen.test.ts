import { getConnection } from "../../config";
import { create } from "./create";
import { seen } from "./seen";

it("marks a game invitation a unseen", async () => {
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

  const result = await seen({ db, invitationId: invitation.id });
  expect(result.status).toEqual("SEEN");
});
