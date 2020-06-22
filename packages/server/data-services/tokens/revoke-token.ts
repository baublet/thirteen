import { Connection } from "../../config";
import { tableName } from "./index";

export async function revokeToken({
  tokens,
  connection,
}: {
  tokens: string[];
  connection: Connection;
}): Promise<void> {
  await connection(tableName)
    .update({ revoked: true })
    .whereIn("token", tokens)
    .limit(tokens.length);
}
