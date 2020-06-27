import { Connection, Transaction } from "../../config";
import { tableName, UserEntity } from "./index";

export async function findById({
  ids,
  db,
}: {
  ids: number[];
  db: Transaction | Connection;
}): Promise<(UserEntity | null)[]> {
  const results: UserEntity[] = await db
    .select("*")
    .from(tableName)
    .whereIn("id", ids)
    .limit(ids.length);
  const users: Record<number, UserEntity> = {};

  for (const user of results) {
    users[user.id] = user;
  }

  return ids.map((id) => users[id] || null);
}
