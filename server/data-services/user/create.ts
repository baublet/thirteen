import { Connection, Transaction } from "../../config";
import { UserEntity, tableName, UserProvider } from "./index";

export async function create({
  db,
  provider,
  providerId,
  providerData,
}: {
  db: Connection | Transaction;
  provider: UserProvider;
  providerId: string;
  providerData: string;
}): Promise<UserEntity> {
  const insertion = await db
    .insert({
      providerData,
      provider,
      providerId,
    })
    .into(tableName);
  // SQLite doesn't support RETURNING. So we have to use this syntax that's
  // provided by knex where it returns an array with one element: the inserted
  // ID.
  const results = await db
    .select("*")
    .from(tableName)
    .where("id", insertion[0])
    .limit(1);
  return results[0];
}
