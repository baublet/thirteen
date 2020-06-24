import { sign } from "jsonwebtoken";

import { jwt } from "../../config";
import { log } from "../../utilities";

interface JwtPayload {
  revokableToken: string;
  user: {
    id: number;
    email: string;
  };
}

export async function createJwt(payload: JwtPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    sign(
      payload,
      jwt.secret,
      {
        expiresIn: Math.floor(Date.now() / 1000) + jwt.expiryDelta,
      },
      (err, token) => {
        if (err) {
          log.error("Error generating a JWT token:", err);
          return reject(err);
        }
        resolve(token);
      }
    );
  });
}
