import { Connection, Transaction } from "../../config";
import { GameInvitationEntity, tableName } from ".";
import { findOutstandingByToUserIdAndGameId } from "./find-outstanding-by-user-id-and-game-id";

interface CreateGameInvitationProps {
  db: Transaction | Connection;
  toUserId: number;
  fromUserId: number;
  gameId: number;
}

export async function canCreate({
  db,
  toUserId,
  gameId,
}: CreateGameInvitationProps): Promise<boolean> {
  const existing = await findOutstandingByToUserIdAndGameId({
    db,
    toUserId,
    gameId,
  });
  if (existing) return true;
  return false;
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
    status: "UNSEEN",
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
