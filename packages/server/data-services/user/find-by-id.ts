import { Connection } from "../../config";
import { User, tableName } from "./index";

export async function findById({
  ids,
  connection,
}: {
  ids: number[];
  connection: Connection;
}): Promise<(User | null)[]> {
  const results: User[] = await connection
    .select("*")
    .from(tableName)
    .whereIn("id", ids)
    .limit(ids.length);
  const users: Record<number, User> = {};

  for (const user of results) {
    users[user.id] = user;
  }

  return ids.map((id) => users[id] || null);
}
