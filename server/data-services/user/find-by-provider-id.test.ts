import { getConnection } from "../../config";
import { create } from "./create";
import { findByProviderId } from "./find-by-provider-id";
import { UserProvider } from ".";

it("finds a user by their provider and provider id", async () => {
  const db = await getConnection("test");
  const created = await create({
    db,
    provider: UserProvider.OKTA,
    providerId: "providerId",
    providerData: "{\"test\":123}",
  });

  const result = await findByProviderId({
    db,
    provider: UserProvider.OKTA,
    providerId: "providerId",
  });

  expect(result).toEqual(created);
});
