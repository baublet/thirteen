import { Express } from "express";

export async function home(app: Express) {
  app.get("/", (request, response) => {
    response.send("Hello world!");
  });
}
