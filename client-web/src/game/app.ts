import { Engine } from "./lib/engine";
import { systems } from "./systems";
import { createRenderableComponent } from "./components/renderable";

class ThirteenEngine extends Engine {
  constructor() {
    super();
  }
}

export const engine = new ThirteenEngine();
for (const system of systems) {
  const initializedSystem = new system();
  engine.attachSystem(initializedSystem, system.name);
}

const helloWorld = engine.createEntity();
engine.createComponent(
  helloWorld,
  createRenderableComponent()
);