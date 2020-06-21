import { Express } from "express";

export async function home(app: Express) {
  app.use("/", (request, response) => {
    response.send("Hello world!");
  });
}
