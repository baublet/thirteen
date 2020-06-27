import { Express } from "express";

export async function home(app: Express) {
  app.get("/", (_, response) => {
    response.send("Hello world! <br><br><br> <a href='/login'>Login</a>");
  });
}
