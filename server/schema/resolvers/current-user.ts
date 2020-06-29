import { Context } from "../context";
import { User } from "../generated";

export async function currentUser(
  _: unknown,
  __: unknown,
  context: Context
): Promise<User | null> {
  const currentUser = await context.currentUser;
  if (!currentUser) return null;
  const providerData = JSON.parse(currentUser.providerData);
  return { id: currentUser.id, name: providerData.name };
}
