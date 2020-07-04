import { Connection, Transaction } from "../../config";
import { GameInvitationEntity, tableName } from ".";

interface FindOutstandingByToUserIdAndGameIdProps {
  toUserId: number;
  gameId: number;
  db: Transaction | Connection;
}

/**
 * Returns a user's outstanding game invitation so that we can determine whether
 * we can create a new invitation. We CAN'T create a new one if:
 * - The invitation has been seen or unseen but not yet responded to
 * - The invitation has been accepted
 */
export async function findOutstandingByToUserIdAndGameId({
  db,
  toUserId,
  gameId,
}: FindOutstandingByToUserIdAndGameIdProps): Promise<GameInvitationEntity | null> {
  const results = await db
    .select("*")
    .from(tableName)
    .where({ toUserId, gameId })
    .whereIn("status", ["UNSEEN", "SEEN", "ACCEPTED"])
    .limit(1);

  if (!results.length) return null;
  return results[0];
}
