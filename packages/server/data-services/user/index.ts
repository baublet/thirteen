import { create } from "./create";
import { dataLoaderFactory } from "./data-loader-factory";
import { findByEmail } from "./find-by-email";
import { findById } from "./find-by-id";

export interface User {
  id: number;
  email: string;
}

export const tableName: string = "users";

export default {
  tableName,
  create,
  findByEmail,
  findById,
  dataLoaderFactory,
};
