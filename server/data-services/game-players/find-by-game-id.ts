import { Connection, Transaction } from "../../config";
import { GamePlayerEntity, tableName } from ".";

interface FindByGameIdProps {
  gameId: number;
  db: Transaction | Connection;
}

export async function findByGameId({
  db,
  gameId,
}: FindByGameIdProps): Promise<GamePlayerEntity[]> {
  return db.select("*").from(tableName).where({ gameId });
}
