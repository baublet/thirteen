import jwt from "jsonwebtoken";
import { Request } from "express";

import { UserEntity } from "../../data-services";
import { decodeJwt } from "../../utilities";

export async function currentUser(
  req: Request
): Promise<UserEntity | undefined> {
  const token = req.headers.authorization || "";
  const decodedToken = await decodeJwt(token);
  // Todo: setup things here to grab the user from the DB
  return decodedToken as any;
}
