import { create } from "./create";

export const tableName: string = "friendRequests";

export interface FriendRequestEntity {
  id: number;
  createdAt: number;
  fromUserId: number;
  toUserId: number;
  status: "UNSEEN" | "SEEN" | "ACCEPTED" | "DECLINED" | "REVOKED";
}

export const Game = { create };
