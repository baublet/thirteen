import { UserEntity } from "../../../data-services";
import { Context } from "../../context";
import { friendConnectionFactory } from "../friend-connection";

export async function friends(
  userEntity: UserEntity,
  __: unknown,
  context: Context
) {
  return friendConnectionFactory({ context, userId: userEntity.id });
}
