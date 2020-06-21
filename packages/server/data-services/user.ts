import { Connection } from "../config";

const tableName: string = "users";

export interface User {
  id: number;
  email: string;
}

export async function create({
  connection,
  email,
}: {
  connection: Connection;
  email: string;
}): Promise<User> {
  return connection
    .insert({
      email,
    })
    .into(tableName)
    .returning("*") as any;
}

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

export async function findByEmail({
  emails,
  connection,
}: {
  emails: string[];
  connection: Connection;
}): Promise<(User | null)[]> {
  const results: User[] = await connection
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
