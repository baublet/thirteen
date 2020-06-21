import { Transaction } from "../config";

const tableName: string = "users";

export interface User {
  id: number;
  email: string;
}

export async function create({
  transaction,
  email,
}: {
  transaction: Transaction;
  email: string;
}): Promise<User> {
  const insertion = await transaction
    .insert({
      email,
    })
    .returning("*")
    .into(tableName);
  // SQLite doesn't support returning, so we need to do a last insertion ID check
  if (typeof insertion[0] !== "number") {
    return insertion[0];
  }
  const results = await transaction
    .select("*")
    .from(tableName)
    .where("id", insertion[0])
    .limit(1);
  return results[0];
}

export async function findById({
  ids,
  transaction,
}: {
  ids: number[];
  transaction: Transaction;
}): Promise<(User | null)[]> {
  const results: User[] = await transaction
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

export async function findByEmail({
  emails,
  transaction,
}: {
  emails: string[];
  transaction: Transaction;
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

export default {
  create,
  findById,
  findByEmail,
};
