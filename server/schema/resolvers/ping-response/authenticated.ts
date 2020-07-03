import { Context } from "../../context";

export async function authenticated(
  _: unknown,
  __: unknown,
  context: Context
): Promise<boolean> {
  return Boolean(await context.currentUser);
}
