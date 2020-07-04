import { Connection, Transaction } from "../../config";
import { GamePlayerEntity, tableName } from ".";

interface FindByIdsProps {
  ids: number[];
  db: Transaction | Connection;
}

export async function findByIds({
  db,
  ids,
}: FindByIdsProps): Promise<GamePlayerEntity[]> {
  const results = await db<GamePlayerEntity>(tableName)
    .select("*")
    .whereIn("id", ids);

  const gamePlayersMap: Record<number, GamePlayerEntity> = {};

  for (const result of results) {
    gamePlayersMap[result.id] = result;
  }

  return ids.map((gId) => gamePlayersMap[gId] || null);
}
