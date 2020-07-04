import { Connection, Transaction } from "../../config";
import { FriendRequestEntity, tableName } from ".";

interface FindFriendRequestByFromIdAndToIdProps {
  db: Transaction | Connection;
  fromUserId: number;
  toUserId: number;
}

export async function findByFromIdAndToId({
  db,
  fromUserId,
  toUserId,
}: FindFriendRequestByFromIdAndToIdProps): Promise<FriendRequestEntity | null> {
  const resultSet1 = await db<FriendRequestEntity>(tableName)
    .select("*")
    .orWhere((db) => db.andWhere({ fromUserId, toUserId }))
    .orWhere((db) =>
      db.andWhere({ fromUserId: toUserId, toUserId: fromUserId })
    )
    .limit(1);

  if (resultSet1.length > 0) {
    return resultSet1[0];
  }

  return null;
}
