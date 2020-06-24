import { ulid } from "ulid";

import { Transaction } from "../../config";
import { Token, TokenType, tableName } from "./index";

export async function create({
  transaction,
  type,
  revoked = false,
}: {
  transaction: Transaction;
  type: TokenType;
  revoked: boolean;
}): Promise<Token> {
  const insertion = await transaction
    .insert({
      type,
      revoked,
      token: ulid(),
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
