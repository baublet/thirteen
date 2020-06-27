import { getConnection } from "../../config";
import { create } from "./create";
import { findById } from "./find-by-id";
import { UserProvider } from ".";

it("finds users by their ids", async () => {
  const db = await getConnection("test");
  const created1 = await create({
    db,
    provider: UserProvider.OKTA,
    providerId: "providerId1",
    providerData: '{"test":123}',
  });
  const created2 = await create({
    db,
    provider: UserProvider.OKTA,
    providerId: "providerId2",
    providerData: '{"test":123}',
  });

  const result = await findById({
    db,
    ids: [created2.id, 999999999999, created1.id],
  });

  expect(result).toEqual([created2, null, created1]);
});
