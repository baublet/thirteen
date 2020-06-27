import { Request } from "express";

import { UserEntity } from "../../data-services";
import { decodeJwt, log } from "../../utilities";

export function tokenFromRequest(req: Request): string {
  const authorizationHeader =
    req.headers.authorization || req.headers.Authorization;
  if (!authorizationHeader) return "";
  if (Array.isArray(authorizationHeader)) {
    return authorizationHeader[0];
  }
  if (authorizationHeader.includes("Bearer")) {
    const parts = authorizationHeader.split(" ");
    return parts[1];
  }
  return authorizationHeader;
}

export async function currentUser(
  req: Request
): Promise<UserEntity | undefined> {
  const token = tokenFromRequest(req);
  if (!token) {
    log.info(
      "No JWT token found in the request payload. Continuing unauthenticated..."
    );
    return undefined;
  }
  const decodedToken = await decodeJwt(token);
  if (decodedToken) {
    log.info(
      `User authenticated. Auth0 payload: ${JSON.stringify(decodedToken)}`
    );
    // Todo: setup things here to grab the user from the DB
    return decodedToken as any;
  }
  return undefined;
}
