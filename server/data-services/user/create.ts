import { Transaction } from "../../config";
import { UserEntity, tableName } from "./index"

export async function create({
  transaction,
  email,
}: {
  transaction: Transaction;
  email: string;
}): Promise<UserEntity> {
  const insertion = await transaction
    .insert({
      email,
    })
    .into(tableName);
  // SQLite doesn't support RETURNING. So we have to use this syntax that's
  // provided by knex where it returns an array with one element: the inserted
  // ID.
  const results = await transaction
    .select("*")
    .from(tableName)
    .where("id", insertion[0])
    .limit(1);
  return results[0];
}