import { Connection, Transaction } from "../../config";
import { GameEntity, tableName } from ".";

interface FindByOwnerUserIdProps {
  ownerUserId: number;
  db: Transaction | Connection;
}

export async function findByOwnerUserId({
  db,
  ownerUserId,
}: FindByOwnerUserIdProps): Promise<GameEntity[]> {
  return db<GameEntity>(tableName).select("*").where({ ownerUserId });
}
