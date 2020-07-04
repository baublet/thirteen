import { UserEntity } from "../../../data-services";
import { Context } from "../../context";
import { gameInvitationConnectionFactory } from "../game-invitation-connection";

export async function gameInvitations(
  userEntity: UserEntity,
  __: unknown,
  context: Context
) {
  return gameInvitationConnectionFactory({ context, toUserId: userEntity.id });
}
