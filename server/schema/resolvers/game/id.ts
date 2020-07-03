import { GameEntity } from "../../../data-services";

export function id(gameEntity: GameEntity): number {
  return gameEntity.id;
}
