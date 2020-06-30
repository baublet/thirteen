import { System, ComponentType, Component, Entity } from "../../lib/engine";
import { ComponentTypes } from "../../components";

export class LoggingSystem implements System<Component> {
  public componentConcerns: ComponentType[] = [ComponentTypes.RENDERABLE];

  public update() {}

  public afterCreate(entity: Entity, component: Component) {
    console.log(`Entity ${entity} attaching component:`, component);
  }

  public beforeDestroy(entity: Entity, component: Component) {
    console.log(`Entity ${entity} destroying component:`, component);
  }

  public afterComponentUpdates(entity: Entity, component: Component) {
    console.log(
      `Entity ${entity} updating component ${component.type} to:`,
      component
    );
  }
}
