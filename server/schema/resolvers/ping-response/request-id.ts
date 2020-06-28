import { Context } from "../../context";

export function requestId(_: unknown, __: unknown, context: Context): string {
  return context.request.id;
}
