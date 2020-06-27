import { ComponentType } from "./Component";
import { EntityManager } from "./EntityManager";
import { Entity } from "./Entity";

export interface System {
  componentType: ComponentType;
  update: (entityManager: EntityManager, entities: Entity[]) => void;
}
