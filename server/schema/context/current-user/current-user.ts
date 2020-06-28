import { Request } from "express";

import { Connection, Transaction } from "../../../config";
import { UserEntity } from "../../../data-services";
import { okta } from "./okta";
import { log } from "../../../utilities";

export async function currentUser(
  req: Request,
  db: Promise<Connection | Transaction>
): Promise<UserEntity | undefined> {
  try {
    const oktaUser = await okta(req, await db);
    if (oktaUser) return oktaUser;

    // In the future, we can add other providers here if we want
    return undefined;
  } catch (e) {
    log.error("Error authenticating the current user", e.message, e);
    return undefined;
  }
}
