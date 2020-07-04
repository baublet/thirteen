import { UserEntity } from "../../../data-services";

export async function name(userEntity: UserEntity): Promise<string> {
  const providerData = JSON.parse(userEntity.providerData);
  return providerData.name;
}
