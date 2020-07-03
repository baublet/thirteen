import { Connection, Transaction } from "../../config";
import { GameInvitationEntity, tableName } from ".";

interface RevokeInvitationProps {
  db: Transaction | Connection;
  invitationId: number;
}

export async function revoke({
  db,
  invitationId,
}: RevokeInvitationProps): Promise<GameInvitationEntity> {
  const insertion = await db<GameInvitationEntity>(tableName)
    .update({
      status: "REVOKED",
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
