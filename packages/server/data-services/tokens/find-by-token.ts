import { Connection } from "../../config";
import { Token, tableName } from "./index";

export async function findByToken({
  tokens,
  connection,
}: {
  tokens: string[];
  connection: Connection;
}): Promise<(Token | null)[]> {
  const results: Token[] = await connection
    .select("*")
    .from(tableName)
    .whereIn("token", tokens)
    .limit(tokens.length);
  const foundTokens: Record<string, Token> = {};

  for (const token of results) {
    foundTokens[token.id] = token;
  }

  return tokens.map((id) => foundTokens[id] || null);
}
