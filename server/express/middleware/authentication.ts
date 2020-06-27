import { Express } from "express";
import session from "express-session";
import { ExpressOIDC } from "@okta/oidc-middleware";

import { log } from "../../utilities";

const authConfig = {
  domain: process.env.OKTA_DOMAIN,
  clientId: process.env.OKTA_CLIENT_ID,
  clientSecret: process.env.OKTA_CLIENT_SECRET,
  redirectUri: process.env.OKTA_REDIRECT_URI,
  sessionSecret: process.env.SESSION_SECRET,
  appBaseUrl: process.env.BASE_URL,
};

export async function authentication(app: Express) {
  // session support is required to use ExpressOIDC
  app.use(
    session({
      secret: authConfig.sessionSecret || "Don'tUseTheDefaultValue",
      resave: true,
      saveUninitialized: false,
    })
  );

  const oidc = new ExpressOIDC({
    appBaseUrl: authConfig.appBaseUrl,
    issuer: `https://${authConfig.domain}/oauth2/default`,
    client_id: authConfig.clientId,
    client_secret: authConfig.clientSecret,
    redirect_uri: authConfig.redirectUri,
    scope: "openid profile",
  });

  oidc.on("error", (error: string) => {
    log.error("Error in OKTA request:", error);
  });

  // ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
  app.use(oidc.router);
}
