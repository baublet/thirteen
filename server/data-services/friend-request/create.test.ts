import { getConnection } from "../../config";
import { create, canCreate } from "./create";

it("creates and returns a game", async () => {
  const db = await getConnection("test");

  const result = await create({ db, fromUserId: 1, toUserId: 2 });

  expect(typeof result.createdAt).toBe("string");
  expect(result.fromUserId).toBe(1);
  expect(result.toUserId).toBe(2);
});

describe("canCreate", () => {
  it("returns true if the request doesn't yet exist, false if it does", async () => {
    const db = await getConnection("test");

    const result1 = await create({ db, fromUserId: 1, toUserId: 2 });
    const result2 = await create({ db, fromUserId: 1, toUserId: 3 });
    const result3 = await create({ db, fromUserId: 1, toUserId: 3 });

    const shouldBeTrue = await canCreate({ db, fromUserId: 2, toUserId: 3 });
    const shouldBeFalse = await canCreate({ db, fromUserId: 3, toUserId: 1 });

    expect(shouldBeTrue).toBe(true);
    expect(shouldBeFalse).toBe(false);
  });
});
