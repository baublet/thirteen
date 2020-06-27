import { Request } from "express";

import { Connection, Transaction } from "../../../config";
import { UserEntity } from "../../../data-services";
import { okta } from "./okta";

export async function currentUser(
  req: Request,
  db: Promise<Connection | Transaction>
): Promise<UserEntity | undefined> {
  const oktaUser = await okta(req, await db);
  if (oktaUser) return oktaUser;

  // In the future, we can add other providers here if we want
  return undefined;
}
