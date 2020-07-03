import { User, UserEntity, UserProvider } from "./user";
import { Game, GameEntity } from "./game";
import { GameInvitation, GameInvitationEntity } from "./game-invitation";
import { GamePlayer, GamePlayerEntity } from "./game-player";

export interface PageInfoArguments {
  limit?: number;
  offset?: number;
}

export const dataServices = {
  User,
  Game,
  GameInvitation,
  GamePlayer,
};

export {
  // Services
  User,
  Game,
  GameInvitation,
  GamePlayer,
  // Types
  UserEntity,
  UserProvider,
  GameEntity,
  GameInvitationEntity,
  GamePlayerEntity,
};
