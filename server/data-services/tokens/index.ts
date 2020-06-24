import { create } from "./create";
import { findById } from "./find-by-id";
import { findByToken } from "./find-by-token";
import { revokeToken } from "./revoke-token";

export enum TokenType {
  JWT = "JWT",
}

export interface Token {
  id: number;
  token: string;
  type: TokenType;
  revoked: boolean;
}

export const tableName: string = "tokens";

export default {
  create,
  findById,
  findByToken,
  revokeToken,
  tableName,
};
