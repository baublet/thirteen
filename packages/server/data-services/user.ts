import { Connection } from "../config";

const tableName: string = "users";

export interface User {
  id: number;
  username: string;
  email: string;
}

export async function create({
  connection,
  username,
  email,
}: {
  connection: Connection;
  username: string;
  email: string;
}): Promise<User> {
  return connection
    .insert({
      username,
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

export async function findByUsername({
  usernames,
  connection,
}: {
  usernames: string[];
  connection: Connection;
}): Promise<(User | null)[]> {
  const results: User[] = await connection
    .select("*")
    .from("tableName")
    .whereIn("username", usernames)
    .limit(usernames.length);
  const users: Record<string, User> = {};

  for (const user of results) {
    users[user.username] = user;
  }

  return usernames.map((name) => users[name] || null);
}

export default {
  create,
  findById,
  findByUsername,
};
