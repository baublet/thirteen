import { Context } from "../../context";
import { log } from "../../../utilities";

/**
 * Returns the current migration version
 */
export async function databaseVersion(
  _: unknown,
  __: unknown,
  context: Context
): Promise<"none" | "unknown" | string> {
  try {
    const connection = await context.getConnection();
    return await connection.migrate.currentVersion();
  } catch (e) {
    log.error("Database error!", e);
    return "unknown";
  }
}
