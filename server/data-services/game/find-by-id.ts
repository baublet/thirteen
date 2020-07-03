import { Connection, Transaction } from "../../config";
import { tableName, GameEntity } from "./index";

export async function findById({
  ids,
  db,
}: {
  ids: number[];
  db: Transaction | Connection;
}): Promise<(GameEntity | null)[]> {
  const results: GameEntity[] = await db
    .select("*")
    .from(tableName)
    .whereIn("id", ids)
    .limit(ids.length);
  const entities: Record<number, GameEntity> = {};

  for (const entity of results) {
    entities[entity.id] = entity;
  }

  return ids.map((id) => entities[id] || null);
}
