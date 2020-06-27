import { Express } from "express";
import path from "path";

const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  audience: "thirteen",
};

export async function login(app: Express) {
  app.get("/login", (request, response) => {
    console.log("Header: ");
    console.log(request.headers);
    response.sendFile("login.html", { root: path.resolve(__dirname) });
  });
  app.get("/auth_config.json", (_, response) => {
    response.send(authConfig);
  });
  app.get("/login.js", (_, response) => {
    response.sendFile("authentication.js", { root: path.resolve(__dirname) });
  });
}
