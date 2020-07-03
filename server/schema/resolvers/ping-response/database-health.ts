import { Context } from "../../context";
import { log } from "../../../utilities";

/**
 * Our general database health check. This actually establishes a connection
 * to the database, checks truthiness, tries to load a dataLoader, checks
 * truthiness, and if any part of that throws is fails their checks, we
 * send back "red". Otherwise, we're green!
 */
export async function databaseHealth(
  _: unknown,
  __: unknown,
  context: Context
): Promise<"red" | "green"> {
  try {
    const connection = await context.connection;
    if (!connection as any) {
      log.error(
        "Unknown error: falsy connection returned from getConnection()"
      );
      return "red";
    }
    const userLoader = context.getLoader("user");
    if (!userLoader) {
      log.error(
        "Unknown error: falsy user loader returned from context.loaders.user()"
      );
      return "red";
    }
    return "green";
  } catch (e) {
    log.error("Database error!", e);
    return "red";
  }
}
