import { User, UserEntity, UserProvider } from "./user";
import { Game, GameEntity } from "./game";
import { GameInvitation, GameInvitationEntity } from "./game-invitation";
import { GamePlayer, GamePlayerEntity } from "./game-player";
import { FriendRequestEntity, FriendRequest } from "./friend-request";

export interface PageInfoArguments {
  limit?: number;
  offset?: number;
}

export const dataServices = {
  FriendRequest,
  Game,
  GameInvitation,
  GamePlayer,
  User,
};

export {
  // Services
  FriendRequest,
  Game,
  GameInvitation,
  GamePlayer,
  User,
  // Types
  UserEntity,
  UserProvider,
  GameEntity,
  GameInvitationEntity,
  GamePlayerEntity,
  FriendRequestEntity,
};
