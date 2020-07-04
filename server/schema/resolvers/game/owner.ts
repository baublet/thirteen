import { GameEntity, GamePlayerEntity } from "../../../data-services";
import { Context } from "../../context";

export async function owner(
  gameEntity: GameEntity,
  _: unknown,
  context: Context
): Promise<GamePlayerEntity> {
  const gamePlayer = await context
    .getLoader("gamePlayer")
    .load(gameEntity.ownerUserId);
  if (!gamePlayer) {
    throw new Error(
      `Game owner assigned a game player ID (${gameEntity.ownerUserId}) that d`
    );
  }
  return gamePlayer;
}
