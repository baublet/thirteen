import { create, canCreate } from "./create";
import { findByFromIdAndToId } from "./find-by-from-id-and-to-id";
import { findFriendsByUserId } from "./find-friends-by-user-id";

export const tableName: string = "friendRequests";

export interface FriendRequestEntity {
  id: number;
  createdAt: number;
  fromUserId: number;
  toUserId: number;
  status: "UNSEEN" | "SEEN" | "ACCEPTED" | "DECLINED" | "REVOKED";
}

export const FriendRequest = {
  create,
  canCreate,
  findByFromIdAndToId,
  findFriendsByUserId,
};
