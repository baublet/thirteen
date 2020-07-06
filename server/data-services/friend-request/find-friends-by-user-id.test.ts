import { getConnection, DatabaseInterface } from "../../config";
import { create } from "./create";
import { findFriendsByUserId } from "./find-friends-by-user-id";
import { accept } from "./accept";

describe("finds friends by the user ids", () => {
  let db: DatabaseInterface;
  let f1t2;
  let f1t3;
  let f1t4;
  let f2t3;
  let f2t4;

  beforeAll(async () => {
    db = await getConnection("test");

    f1t2 = await create({ db, fromUserId: 1, toUserId: 2 });
    f1t3 = await create({ db, fromUserId: 1, toUserId: 3 });
    f1t4 = await create({ db, fromUserId: 4, toUserId: 1 });
    f2t4 = await create({ db, fromUserId: 4, toUserId: 2 });
    f2t3 = await create({ db, fromUserId: 2, toUserId: 3 });

    f1t3 = await accept({ db, requestId: f1t3.id });
    f2t3 = await accept({ db, requestId: f2t3.id });
    f1t2 = await accept({ db, requestId: f1t2.id });
  });

  it("user 1: friends with 2 and 3", async () => {
    await expect(findFriendsByUserId({ db, userId: 1 })).resolves.toEqual([
      f1t2,
      f1t3,
    ]);
  });

  it("user 2: friends with 1 and 3", async () => {
    await expect(findFriendsByUserId({ db, userId: 2 })).resolves.toEqual([
      f1t2,
      f2t3,
    ]);
  });

  it("user 3: friends with 1 and 2", async () => {
    await expect(findFriendsByUserId({ db, userId: 3 })).resolves.toEqual([
      f1t3,
      f2t3,
    ]);
  });

  it("user 4: no friends", async () => {
    await expect(findFriendsByUserId({ db, userId: 4 })).resolves.toEqual([]);
  });
});
