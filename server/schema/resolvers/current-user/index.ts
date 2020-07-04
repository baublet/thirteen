import { User } from "../user";
import { games } from "./games";

export const CurrentUser = {
  ...User,
  games,
};
