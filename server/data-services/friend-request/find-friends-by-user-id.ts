import { Connection, Transaction } from "../../config";
import { FriendRequestEntity, tableName } from ".";

interface FindFriendRequestByFromIdAndToIdProps {
  db: Transaction | Connection;
  userId: number;
}

export async function findFriendsByUserId({
  db,
  userId,
}: FindFriendRequestByFromIdAndToIdProps): Promise<FriendRequestEntity[]> {
  const results = await db<FriendRequestEntity>(tableName)
    .select("*")
    .andWhere((db) => {
      db.orWhere({ toUserId: userId });
      db.orWhere({ fromUserId: userId });
    })
    .andWhere("status", "=", "ACCEPTED");
  return results;
}
