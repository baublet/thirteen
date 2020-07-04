import { GamePlayerEntity, UserEntity } from "../../../data-services";
import { Context } from "../../context";

export async function user(
  gamePlayerEntity: GamePlayerEntity,
  _: unknown,
  context: Context
): Promise<UserEntity> {
  console.log("Game player parent: ", gamePlayerEntity);
  const user = await context.getLoader("user").load(gamePlayerEntity.userId);
  if (!user) {
    throw new Error(
      `Bad data error. Could not find user ID ${gamePlayerEntity.userId} on gamePlayerEntity ${gamePlayerEntity.id}`
    );
  }
  return user;
}
