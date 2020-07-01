import * as Pixi from "pixi.js";

import { Asset } from "./index";

export async function loadAssets(): Promise<void> {
  return new Promise((resolve) => {
    let app = new Pixi.Application({
      width: 256,
      height: 256,
      antialias: true,
      transparent: false,
      resolution: 1,
    });

    document.body.appendChild(app.view);

    const loader = Pixi.Loader.shared;
    loader.add(Object.values(Asset)).load(function () {
      console.log("Arguments ", arguments);
      resolve();
    });
  });
}
