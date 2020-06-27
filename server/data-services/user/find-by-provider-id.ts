import { Transaction, Connection } from "../../config";
import { tableName, UserEntity, UserProvider } from "./index";

export async function findByProviderId({
  provider,
  providerId,
  db,
}: {
  provider: UserProvider;
  providerId: string;
  db: Connection | Transaction;
}): Promise<UserEntity | undefined> {
  const results: UserEntity[] = await db
    .select("*")
    .from(tableName)
    .where({
      provider,
      providerId,
    })
    .limit(1);

  return results[0];
}
