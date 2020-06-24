import { Connection } from "../../config";
import { User, tableName } from "./index"

export async function findByEmail({
  emails,
  transaction,
}: {
  emails: string[];
  transaction: Connection;
}): Promise<(User | null)[]> {
  const results: User[] = await transaction
    .select("*")
    .from(tableName)
    .whereIn("email", emails)
    .limit(emails.length);
  const users: Record<string, User> = {};

  for (const user of results) {
    users[user.email] = user;
  }

  return emails.map((email) => users[email] || null);
}