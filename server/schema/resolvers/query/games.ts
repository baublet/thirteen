import { Context } from "../../context";
import { gameConnectionFactory } from "../game-connection";

export async function games(
  _: unknown,
  __: unknown,
  context: Context
): Promise<{}> {
  const currentUser = await context.currentUser;
  return gameConnectionFactory({ context, ownerUserId: currentUser.id });
}
