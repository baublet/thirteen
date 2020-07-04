import { Context } from "../../context";
import { gameConnectionFactory } from "../game-connection";

export async function games(
  _: unknown,
  __: unknown,
  context: Context
): Promise<{}> {
  const currentUser = await context.currentUser;
  if (!currentUser) {
    throw new Error(
      `Invariant error... Current user unable to be resolved within the current user resolver`
    );
  }
  return gameConnectionFactory({ context, ownerUserId: currentUser.id });
}
