export type Entity = number;

export type ComponentShape = Record<string, string | number>;
export type ComponentType = number;

export interface Component {
  type: ComponentType;
}

export interface System<C extends Component = Component> {
  componentConcerns: ComponentType[];
  update(engine: Engine): void;

  initialize?(engine: Engine): void;
  beforeComponentCreated?(entity: Entity, component: C, engine: Engine): void;
  afterComponentCreated?(entity: Entity, component: C, engine: Engine): void;
  beforeComponentDestroyed?(entity: Entity, component: C, engine: Engine): void;
  afterComponentDestroyed?(entity: Entity, component: C, engine: Engine): void;
  beforeComponentUpdates?(entity: Entity, component: C, engine: Engine): void;
  afterComponentUpdates?(entity: Entity, component: C, engine: Engine): void;
}

export class Engine {
  protected entitySeed: number = 0;
  protected componentSeed: number = 0;

  protected entityComponents: Map<Entity, Component[] | undefined> = new Map();
  protected systems: Map<ComponentType, System[]> = new Map();

  public createEntity(): number {
    return this.entitySeed++;
  }

  public destroyEntity(entity: Entity): void {
    const components = this.entityComponents.get(entity);
    if (!components) return;

    this.entityComponents.set(entity, undefined);
  }

  public createComponent<T extends Component>(entity: Entity, component: T) {
    const concernedSystems = this.getConcernedSystems(component);

    for (const system of concernedSystems) {
      if (system.beforeComponentCreated)
        system.beforeComponentCreated(entity, component, this);
    }

    if (!this.entityComponents.has(entity)) {
      this.entityComponents.set(entity, [component]);
    } else {
      this.entityComponents.get(entity)?.push(component);
    }

    for (const system of concernedSystems) {
      if (system.afterComponentCreated)
        system.afterComponentCreated(entity, component, this);
    }

    return component;
  }

  public attachSystem(system: System, systemName: string) {
    console.log(`Attaching ${systemName}`);
    const concerns = system.componentConcerns;
    for (const type of concerns) {
      if (!this.systems.get(type)) {
        this.systems.set(type, []);
      }
      this.systems.get(type)?.push(system);
    }
    if (system.initialize) system.initialize(this);
  }

  protected getConcernedSystems(component: Component): System[] {
    const type = component.type;
    return this.systems.get(type) || [];
  }

  public updateComponent<UC extends Component>(
    entity: Entity,
    component: UC,
    fn: (component: UC) => void
  ): void {
    const concernedSystems = this.getConcernedSystems(component);
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
    const concernedSystems = this.getConcernedSystems(component);

    const components = this.getEntityComponents(entity);
    const index = components.indexOf(component);

    if (index < 0) return entity;

    for (const system of concernedSystems) {
      if (system.beforeComponentDestroyed)
        system.beforeComponentDestroyed(entity, component, this);
    }

    components.splice(index, 1);

    for (const system of concernedSystems) {
      if (system.afterComponentDestroyed)
        system.afterComponentDestroyed(entity, component, this);
    }

    return;
  }

  public getEntityComponents(entity: Entity): Component[] {
    return this.entityComponents.get(entity) || [];
  }

  public getEntityComponentsByType<T extends Component = Component>(
    entity: Entity,
    type: ComponentType
  ): T[] {
    return this.getEntityComponents(entity).filter(
      (c) => c.type === type
    ) as T[];
  }
}
