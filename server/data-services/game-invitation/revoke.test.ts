import { getConnection } from "../../config";
import { create } from "./create";
import { revoke } from "./revoke";

it("marks a game invitation as revoked", async () => {
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

  const result = await revoke({ db, invitationId: invitation.id });
  expect(result.status).toEqual("REVOKED");
});
