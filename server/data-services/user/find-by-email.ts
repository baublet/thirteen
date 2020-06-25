import { Connection } from "../../config";
import { tableName, UserEntity } from "./index"

export async function findByEmail({
  emails,
  transaction,
}: {
  emails: string[];
  transaction: Connection;
}): Promise<(UserEntity | null)[]> {
  const results: UserEntity[] = await transaction
    .select("*")
    .from(tableName)
    .whereIn("email", emails)
    .limit(emails.length);
  const users: Record<string, UserEntity> = {};

  for (const user of results) {
    users[user.email] = user;
  }

  return emails.map((email) => users[email] || null);
}