import { friends } from "./friends";
import { games } from "./games";
import { gameInvitations } from "./game-invitations";
import { User } from "../user";

export const CurrentUser = {
  ...User,
  friends,
  games,
  gameInvitations,
};
