import { Context } from "../../context";

export async function requestId(_: unknown, __: unknown, context: Context): Promise<string> {
  console.log("CURRENT USER: ", await context.currentUser)
  return context.request.id;
}
