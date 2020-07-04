import { Context } from "../../context";
import { gameConnectionFactory } from "../game-connection";
import { UserEntity } from "../../../data-services";

export async function games(
  userEntity: UserEntity,
  __: unknown,
  context: Context
) {
  return gameConnectionFactory({ context, ownerUserId: userEntity.id });
}
