import { create } from "./create";

export const tableName: string = "gameInvitations";

export interface GameInvitationEntity {
  id: number;
  createdAt: number;
  toUserId: number;
  fromUserId: number;
  gameId: number;
  status: "accepted" | "declined" | "seen" | "unseen" | "revoked";
}

export const Game = { create };
