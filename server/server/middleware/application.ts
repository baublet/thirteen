import express from "express";

import { log } from "../utilities";
import { middleware as gqlMiddleware } from "../schema";
import { middleware } from "./middleware";

export async function start() {
  const app = express();

  log.info("Applying middleware: GraphQL Server");
  await gqlMiddleware(app);

  await Promise.all(
    middleware.map(async (middleware) => {
      log.info("Applying middleware:", middleware.name);
      await middleware(app);
    })
  );

  const port = process.env.PORT || 80;
  app.listen(port, () => {
    log.info(`Server is listening on port ${port}`);
  });
}
