import { Express } from "express";

export async function login(app: Express) {
  app.use("/login", (request, response) => {
    response.send("Hello world!");
  });
}
