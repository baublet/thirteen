import { getConnection } from "../../config";
import { create } from "./create";
import { UserProvider } from ".";

it("creates and returns a user", async () => {
  const connection = await getConnection("test");
  const result = await create({
    db: connection,
    provider: UserProvider.OKTA,
    providerId: "providerId",
    providerData: '{"test":123}',
  });
  expect(result.providerData).toEqual('{"test":123}');
});
