import { systems } from "pixi.js";

export type Entity = number;

export type ComponentShape = Record<string, string | number>;
export type ComponentType = symbol;

export abstract class Component {
  public type: ComponentType;
  public onCreate?: (entity: Entity, engine: Engine) => void;
  public onDestroy?: (entity: Entity, engine: Engine) => void;
}

export class Engine {
  protected _entitySeed: number = 0;
  protected _componentSeed: number = 0;

  protected _entityComponents: Map<Entity, Component[] | undefined> = new Map();
  protected _systems: System<Component>[];

  public createEntity(): number {
    return this._entitySeed++;
  }

  public destroyEntity(entity: Entity): void {
    const components = this._entityComponents.get(entity);
    if (!components) return;

    this._entityComponents.set(entity, undefined);
  }

  public createComponent<T extends Component>(entity: Entity, component: T) {
    if (!this._entityComponents.has(entity)) {
      this._entityComponents.set(entity, [component]);
    } else {
      this._entityComponents.get(entity)?.push(component);
    }
    if (component.onCreate) {
      component.onCreate(entity, this);
    }
    return component;
  }

  public attachSystem(system: System<Component>) {
    this._systems.push(system);
    if (system.initialize) {
      system.initialize(this);
    }
  }

  protected getConcernedSystemsForComponent(
    component: Component
  ): System<Component>[] {
    const concernedSystems: System<Component>[] = [];
    for (const system of this._systems) {
      if (system.componentType !== component.type) continue;
      concernedSystems.push(system);
    }
    return concernedSystems;
  }

  public updateComponent<UC extends Component>(
    entity: Entity,
    component: UC,
    fn: (component: UC) => void
  ): void {
    const concernedSystems = this.getConcernedSystemsForComponent(component);

    for (const system of concernedSystems) {
      if (system.beforeComponentUpdates)
        system.beforeComponentUpdates(entity, component, this);
    }

    fn(component);

    for (const system of concernedSystems) {
      if (system.afterComponentUpdates)
        system.afterComponentUpdates(entity, component, this);
    }
  }

  public destroyComponent<E extends Entity>(entity: E, component: Component) {
    const components = this.getEntityComponents(entity);
    const index = components.indexOf(component);

    if (index < 0) return entity;

    if (component.onDestroy) {
      component.onDestroy(entity, this);
    }
    components.splice(index, 1);

    return;
  }

  protected getEntityComponents(entity: Entity): Component[] {
    return this._entityComponents.get(entity) || [];
  }

  protected getEntityComponentsByType(
    entity: Entity,
    type: ComponentType
  ): Component[] {
    return this.getEntityComponents(entity).filter((c) => c.type === type);
  }
}

export abstract class System<T extends Component> {
  public readonly componentType: ComponentType | undefined;
  constructor(component?: ComponentType | Component) {
    if (typeof component === "symbol") {
      this.componentType = component;
      return;
    }
    if (component) {
      this.componentType = component.type;
      return;
    }
  }

  public abstract update(entities: Entity[], engine: Engine): void;

  public abstract initialize?(engine: Engine): void;

  public abstract beforeComponentCreated?(
    entity: Entity,
    component: T,
    engine: Engine
  ): void;
  public abstract beforeComponentDestroyed?(
    entity: Entity,
    component: T,
    engine: Engine
  ): void;
  public abstract beforeComponentUpdates?(
    entity: Entity,
    component: Component,
    engine: Engine
  ): void;
  public abstract afterComponentUpdates?(
    entity: Entity,
    component: Component,
    engine: Engine
  ): void;
}
