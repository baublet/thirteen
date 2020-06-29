import { Connection, Transaction } from "../../config";
import { GameInvitationEntity, tableName } from ".";

interface CreateGameInvitationProps {
  db: Transaction | Connection;
  toUserId: number;
  fromUserId: number;
  gameId: number;
}

export async function create({
  db,
  toUserId,
  fromUserId,
  gameId,
}: CreateGameInvitationProps): Promise<GameInvitationEntity> {
  const insertion = await db<GameInvitationEntity>(tableName).insert({
    createdAt: Date.now(),
    toUserId,
    fromUserId,
    gameId,
    status: "unseen",
  });
  // SQLite doesn't support RETURNING. So we have to use this syntax that's
  // provided by knex where it returns an array with one element: the inserted
  // ID.
  const results = await db
    .select("*")
    .from(tableName)
    .where("id", insertion[0])
    .limit(1);
  return results[0];
}
