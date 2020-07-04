import { create, canCreate } from "./create";
import { findByGameId } from "./find-by-game-id";
import { findByToUserId } from "./find-by-to-user-id";
import { seen } from "./seen";
import { accept } from "./accept";
import { revoke } from "./revoke";
import { findOutstandingByToUserIdAndGameId } from "./find-outstanding-by-user-id-and-game-id";

export const tableName: string = "gameInvitations";

export interface GameInvitationEntity {
  id: number;
  createdAt: number;
  toUserId: number;
  fromUserId: number;
  gameId: number;
  status: "ACCEPTED" | "DECLINED" | "SEEN" | "UNSEEN" | "REVOKED";
}

export const GameInvitation = {
  create,
  findByGameId,
  findByToUserId,
  seen,
  accept,
  revoke,
  findOutstandingByToUserIdAndGameId,
  canCreate,
};
