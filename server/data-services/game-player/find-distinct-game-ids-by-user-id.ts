import { Connection, Transaction } from "../../config";
import { tableName, GamePlayerEntity } from ".";

interface FindDistinctGameIdsByUserIdProps {
  userIds: number[];
  db: Transaction | Connection;
}

export async function findDistinctGameIdsByUserId({
  db,
  userIds,
}: FindDistinctGameIdsByUserIdProps): Promise<number[][]> {
  const map: number[][] = [];

  const results = await db<GamePlayerEntity>(tableName)
    .select("userId")
    .select("gameId")
    .whereIn("userId", userIds)
    .groupBy(`${tableName}.userId`);

  for (const userId of userIds) {
    const gameIds = results
      .filter((result) => result.userId === userId)
      .map((gamePlayer) => gamePlayer.gameId);
    map.push(gameIds);
  }
  return map;
}
