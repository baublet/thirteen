import { Connection, Transaction } from "../../config";
import { GameEntity, tableName } from ".";

interface CreateGamePlayerProps {
  db: Transaction | Connection;
}

export async function create({
  db,
}: CreateGamePlayerProps): Promise<GameEntity> {
  const insertion = await db
    .insert({
      createdAt: Date.now(),
    })
    .into(tableName);
  // SQLite doesn't support RETURNING. So we have to use this syntax that's
  // provided by knex where it returns an array with one element: the inserted
  // ID.
  const results = await db
    .select("*")
    .from(tableName)
    .where("id", insertion[0])
    .limit(1);
  return results[0];
}
