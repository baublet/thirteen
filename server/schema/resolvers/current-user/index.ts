import { User } from "../user";
import { games } from "./games";
import { gameInvitations } from "./game-invitations";

export const CurrentUser = {
  ...User,
  games,
  gameInvitations,
};
