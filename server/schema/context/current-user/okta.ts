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
      email: string;
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
  const providerData = req.userContext.userinfo;
  const providerDataString = JSON.stringify(providerData);

  const existingUser = await User.findByProviderId({
    db,
    providerId,
    provider,
  });
  if (existingUser) {
    if (providerDataString === existingUser.providerData) return existingUser;
    log.info(
      `Updating existing user's provider data to match new record. Provider: ${provider}. User ID: ${existingUser.providerId}`
    );
    return User.updateProviderData({
      db,
      where: {
        provider,
        providerId,
      },
      providerData: providerDataString,
    });
  }

  log.info("Okta user authorizing for the first time:", providerId);
  return User.create({
    db,
    provider,
    providerId,
    providerData: JSON.stringify(providerData),
  });
}
