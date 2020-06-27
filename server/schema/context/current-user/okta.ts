import { Request } from "express";

import { UserEntity, UserProvider, User } from "../../../data-services";
import { Connection, Transaction } from "../../../config";
import { log } from "../../../utilities";

export type ExtendedRequest = Request & {
  // Okta middleware signature
  userContext?: {
    userinfo?: {
      sub: string;
      name: string;
      preferred_username: string;
      updatedAt: number;
    };
  };
};

export async function okta(
  req: ExtendedRequest,
  db: Connection | Transaction
): Promise<UserEntity | undefined> {
  if (!req.userContext) return undefined;
  if (!req.userContext.userinfo) return undefined;

  const providerId = req.userContext.userinfo.sub;
  const provider = UserProvider.OKTA;
  const existingUser = await User.findByProviderId({
    db,
    providerId,
    provider,
  });
  if (existingUser) return existingUser;

  const providerData = req.userContext.userinfo;
  log.info("Okta user authorizing for the first time:", providerId);
  return User.create({
    db,
    provider,
    providerId,
    providerData: JSON.stringify(providerData),
  });
}
