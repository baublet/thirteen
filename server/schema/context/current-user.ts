import jwt from "jsonwebtoken";
import { Request } from "express";

import { User } from "../../data-services";
import { getKey, jwtOptions } from "../../utilities";

export function currentUser(req: Request): Promise<typeof User | undefined> {
  return new Promise((resolve) => {
    const token = req.headers.authorization || "";
    jwt.verify(token, getKey, jwtOptions, (err, decoded) => {
      if (err) {
        return resolve(undefined);
      }
      resolve(decoded.email);
    });
  });
}
