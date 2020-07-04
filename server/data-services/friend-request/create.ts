import { Connection, Transaction } from "../../config";
import { FriendRequestEntity, tableName } from ".";

interface CreateFriendRequestProps {
  db: Transaction | Connection;
  fromUserId: number;
  toUserId: number;
}

export async function create({
  db,
  fromUserId,
  toUserId,
}: CreateFriendRequestProps): Promise<FriendRequestEntity> {
  const insertion = await db
    .insert({
      fromUserId,
      toUserId,
    })
    .into(tableName);
  // SQLite doesn't support RETURNING. So we have to use this syntax that's
  // provided by knex where it returns an array with one element: the inserted
  // ID.
  const results = await db<FriendRequestEntity>(tableName)
    .select("*")
    .where("id", insertion[0])
    .limit(1);
  return results[0];
}
