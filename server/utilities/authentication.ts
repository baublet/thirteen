import jwksRsa from "jwks-rsa";
import jwt, { Algorithm, JwtHeader } from "jsonwebtoken";

import { log } from ".";
import assert from "assert";

export const domain = process.env.AUTH0_DOMAIN;
export const secret = process.env.AUTH0_CLIENT_SECRET;
export const clientId = process.env.AUTH0_CLIENT_ID;

export const client = jwksRsa({
  jwksUri: `https:/${domain}/.well-known/jwks.json`,
});

export function getKey(header: JwtHeader, cb: Function): void {
  const keyId = header.kid;
  client.getSigningKey(keyId as string, (err, key) => {
    if (err) {
      log.error(
        `Error getting the signing key. KeyID: ${keyId} (${typeof keyId}). Error: `,
        err
      );
    }
    cb(null, key.getPublicKey());
  });
}

export const jwtOptions = {
  audience: clientId,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"] as Algorithm[],
};

export function decodeJwt(token: string): Promise<Object> {
  return new Promise((resolve) => {
    jwt.verify(token, getKey, jwtOptions, (err, decoded) => {
      if (err) {
        return resolve(undefined);
      }
      assert(decoded !== undefined);
      resolve(decoded);
    });
  });
}
