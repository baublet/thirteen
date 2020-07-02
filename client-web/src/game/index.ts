import { Engine } from "./lib/engine";
import { systems } from "./systems";
import { createRenderableComponent } from "./components/renderable";
import {
  createCardComponent,
  CardTypeEnum,
  CardSuitEnum,
} from "./components/card";

class ThirteenEngine extends Engine {
  constructor() {
    super();
  }
}

function initialize() {
  const engine = new ThirteenEngine();
  for (const system of systems) {
    const initializedSystem = new system();
    engine.attachSystem(initializedSystem, system.name);
  }

  const helloWorld = engine.createEntity();
  engine.createComponent(
    helloWorld,
    createCardComponent(CardTypeEnum.EIGHT, CardSuitEnum.DIAMONDS)
  );
  const card = createRenderableComponent();
  engine.createComponent(helloWorld, card);
  card.z = 150;
}

(async function () {
  console.log("Initializing game...");
  initialize();
})();
