import { Entity, createEntity as createEntityFn } from "./Entity";
import { Component, ComponentType } from "./Component";
import { System } from "./System";

export interface EntityManager {
  createEntity: () => Entity;
  destroyEntity: (entity: Entity) => void;
  getComponents: (entity: Entity, type: ComponentType) => Component[];
  createComponent: (entity: Entity, component: Component) => Component;
  attachSystem: (componentType: ComponentType, system: System) => void;
  update: () => void;
  getEntities: () => Entity[];
}

class EntityNotCreatedError extends Error {
  constructor(entity: Entity) {
    super(
      `Tried to get an entity (${entity}) before it was created. Make sure to only create entities via the entity manager itself.`
    );
  }
}

class SystemAlreadyAttachedToComponentTypeError extends Error {
  constructor(componentType: ComponentType) {
    super(
      `Tried to attach a system to a component type (${componentType}) that already has a system attached to it.`
    );
  }
}

export function entityManagerFactory(): EntityManager {
  const entityMap = new Map<Entity, Component[]>();
  const componentsMap = new Map<ComponentType, Entity[]>();
  const systemsMap = new Map<ComponentType, System>();

  const entityManager: EntityManager = {} as EntityManager;

  // attachSystem
  function attachSystem(componentType: ComponentType, system: System) {
    if (systemsMap.get(componentType)) {
      throw new SystemAlreadyAttachedToComponentTypeError(componentType);
    }
    systemsMap.set(componentType, system);
  }
  entityManager.attachSystem = attachSystem;

  // createEntity
  function createEntity(): Entity {
    const entity = createEntityFn();
    entityMap.set(entity, []);
    return entity;
  }
  entityManager.createEntity = createEntity;

  // destroyEntity
  function destroyEntity(entity: Entity) {
    for (const entities of componentsMap.values()) {
      const index = entities.indexOf(entity);
      if (index === -1) continue;
      entities.splice(index, 1);
    }
    entityMap.delete(entity);
  }
  entityManager.destroyEntity = destroyEntity;

  // createComponents
  function createComponent(entity: Entity, component: Component): Component {
    const entityComponents = entityMap.get(entity);
    if (!entityComponents) {
      throw new EntityNotCreatedError(entity);
    }
    entityComponents.push(component);

    // We need a map of components -> entities. This pushes the entities to the map
    const type = component.type;
    if (!componentsMap.has(type)) {
      componentsMap.set(type, [entity]);
    } else {
      const entities = componentsMap.get(type);
      if (!entities?.includes(type)) entities?.push(type);
    }

    return component;
  }
  entityManager.createComponent = createComponent;

  // getComponents
  function getComponents(
    entity: Entity,
    componentType?: ComponentType
  ): Component[] {
    const entityComponents = entityMap.get(entity);
    if (!entityComponents) {
      throw new EntityNotCreatedError(entity);
    }
    if (!componentType) return entityComponents;
    return entityComponents.filter(
      (component) => component.type === componentType
    );
  }
  entityManager.getComponents = getComponents;

  // update
  function update() {
    for (const [componentType, system] of systemsMap.entries()) {
      const systemEntities = componentsMap.get(componentType);
      if (!systemEntities) continue;
      system.update(entityManager, systemEntities);
    }
  }
  entityManager.update = update;

  // getEntities
  function getEntities(): Entity[] {
    return Array.from(entityMap.keys());
  }
  entityManager.getEntities = getEntities;

  // Return the full factory
  return entityManager;
}
