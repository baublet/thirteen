import { Connection, Transaction } from "../../config";
import { GameInvitationEntity, tableName } from ".";

interface FindByToUserIdProps {
  toUserId: number;
  db: Transaction | Connection;
}

export async function findByToUserId({
  db,
  toUserId,
}: FindByToUserIdProps): Promise<GameInvitationEntity[]> {
  return db.select("*").from(tableName).where({ toUserId });
}
