import { Connection, Transaction } from "../../config";
import { GameInvitationEntity, tableName } from ".";

interface FindBytoUserIdProps {
  toUserId: number;
  db: Transaction | Connection;
}

export async function findByToUserId({
  db,
  toUserId,
}: FindBytoUserIdProps): Promise<GameInvitationEntity[]> {
  return db.select("*").from(tableName).where({ toUserId });
}
