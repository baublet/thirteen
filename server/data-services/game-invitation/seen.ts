import { Connection, Transaction } from "../../config";
import { GameInvitationEntity, tableName } from ".";

interface SeenInvitationProps {
  db: Transaction | Connection;
  invitationId: number;
}

export async function seen({
  db,
  invitationId,
}: SeenInvitationProps): Promise<GameInvitationEntity> {
  const insertion = await db<GameInvitationEntity>(tableName)
    .update({
      status: "SEEN",
    })
    .where("id", invitationId)
    .limit(1);
  // SQLite doesn't support RETURNING. So we have to use this syntax that's
  // provided by knex where it returns an array with one element: the inserted
  // ID.
  const results = await db
    .select("*")
    .from(tableName)
    .where("id", invitationId)
    .limit(1);
  return results[0];
}
