import { create } from "./create";
import { dataLoaderFactory } from "./data-loader-factory";
import { findById } from "./find-by-id";
import { findByProviderId } from "./find-by-provider-id";
import { updateProviderData } from "./update-provider-data";

export enum UserProvider {
  OKTA = "okta",
}

export interface UserEntity {
  id: number;
  provider: UserProvider;
  providerId: string;
  providerData: string;
}

export const tableName: string = "users";

export const User = {
  tableName,
  create,
  findById,
  dataLoaderFactory,
  findByProviderId,
  updateProviderData,
};
