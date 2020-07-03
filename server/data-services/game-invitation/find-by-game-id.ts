import { Connection, Transaction } from "../../config";
import { GameInvitationEntity, tableName } from ".";

interface FindByGameIdProps {
  gameId: number;
  db: Transaction | Connection;
}

export async function findByGameId({
  db,
  gameId,
}: FindByGameIdProps): Promise<GameInvitationEntity[]> {
  return db.select("*").from(tableName).where({ gameId });
}
