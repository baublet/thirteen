import { GameEntity, GamePlayerEntity } from "../../../data-services";
import { Context } from "../../context";

export async function players(
  gameEntity: GameEntity,
  _: unknown,
  context: Context
): Promise<GamePlayerEntity[]> {
  const results = await context
    .getLoader("gamePlayerByGame")
    .load(gameEntity.id);
  return results || [];
}
