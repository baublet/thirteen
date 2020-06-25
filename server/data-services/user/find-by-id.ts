import { Connection } from "../../config";
import { tableName, UserEntity } from "./index";

export async function findById({
  ids,
  connection,
}: {
  ids: number[];
  connection: Connection;
}): Promise<(UserEntity | null)[]> {
  const results: UserEntity[] = await connection
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
