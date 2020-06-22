import { Connection } from "../../config";
import { Token, tableName } from "./index";

export async function findById({
  ids,
  connection,
}: {
  ids: number[];
  connection: Connection;
}): Promise<(Token | null)[]> {
  const results: Token[] = await connection
    .select("*")
    .from(tableName)
    .whereIn("id", ids)
    .limit(ids.length);
  const tokens: Record<number, Token> = {};

  for (const token of results) {
    tokens[token.id] = token;
  }

  return ids.map((id) => tokens[id] || null);
}
