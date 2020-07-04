import { DatabaseInterface } from "../../config";
import { FriendRequestEntity, tableName } from ".";

interface AcceptFriendRequestProps {
  db: DatabaseInterface;
  requestId: number;
}

export async function canAccept({
  db,
  requestId,
}: AcceptFriendRequestProps): Promise<boolean> {
  const results = await db<FriendRequestEntity>(tableName)
    .select("*")
    .where("id", requestId)
    .limit(1);
  if (!results) return false;
  if (results.length === 0) return false;
  return ["UNSEEN", "SEEN", "DECLINED"].includes(results[0].status);
}

export async function accept({
  db,
  requestId,
}: AcceptFriendRequestProps): Promise<FriendRequestEntity> {
  await db<FriendRequestEntity>(tableName)
    .update({
      status: "ACCEPTED",
    })
    .where("id", requestId)
    .limit(1);
  // SQLite doesn't support RETURNING. So we have to use this syntax that's
  // provided by knex where it returns an array with one element: the inserted
  // ID.
  const results = await db<FriendRequestEntity>(tableName)
    .select("*")
    .where("id", requestId)
    .limit(1);
  return results[0];
}
