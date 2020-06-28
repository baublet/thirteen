import { Connection, Transaction } from "../../config";
import { UserEntity, tableName, UserProvider } from "./index";

export async function updateProviderData({
  db,
  where: { provider, providerId },
  providerData,
}: {
  db: Connection | Transaction;
  where: {
    provider: UserProvider;
    providerId: string;
  };
  providerData: string;
}): Promise<UserEntity> {
  await db.update({ providerData }).where({ provider, providerId }).limit(1);
  // SQLite doesn't support RETURNING. So we have to use this syntax that's
  // provided by knex where it returns an array with one element: the inserted
  // ID.
  const results = await db
    .select("*")
    .from(tableName)
    .where({ provider, providerId })
    .limit(1);
  return results[0];
}
