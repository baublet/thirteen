import { Connection, Transaction } from "../../config";
import { GamePlayerEntity, tableName } from ".";

interface FindByUserIdProps {
  gameIds: number[];
  db: Transaction | Connection;
}

export async function findByGameIds({
  db,
  gameIds,
}: FindByUserIdProps): Promise<GamePlayerEntity[][]> {
  const results = await db<GamePlayerEntity>(tableName)
    .select("*")
    .whereIn("gameId", gameIds);

  const gamesMap: Record<number, GamePlayerEntity[]> = {};

  for (const result of results) {
    if (!gamesMap[result.gameId]) gamesMap[result.gameId] = [];
    gamesMap[result.gameId].push(result);
  }

  return gameIds.map((gId) => gamesMap[gId] || []);
}
