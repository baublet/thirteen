import { create, canCreate } from "./create";
import { findByFromIdAndToId } from "./find-by-from-id-and-to-id";

export const tableName: string = "friendRequests";

export interface FriendRequestEntity {
  id: number;
  createdAt: number;
  fromUserId: number;
  toUserId: number;
  status: "UNSEEN" | "SEEN" | "ACCEPTED" | "DECLINED" | "REVOKED";
}

export const FriendRequest = { create, canCreate, findByFromIdAndToId };
