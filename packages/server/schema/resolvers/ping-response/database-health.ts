import { Context } from "../../context";

export async function databaseHealth(
  _: unknown,
  __: unknown,
  context: Context
): Promise<"red" | "green"> {
  try {
    const connection = await context.getConnection();
    if (connection as any) return "green";
    return "red";
  } catch (e) {
    return "red";
  }
}
