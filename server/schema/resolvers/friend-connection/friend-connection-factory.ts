import { Context } from "../../context";

export async function friendConnectionFactory({
  context,
  userId,
}: {
  context: Context;
  userId: number;
}) {
  const FriendRequest = context.dataServices.FriendRequest;
  const currentUser = await context.currentUser;

  if (!userId) {
    throw new Error(`Can't create a connection factory without any parameters`);
  }

  async function getEntities() {
    const db = await context.connection;
    return await FriendRequest.findFriendsByUserId({
      db,
      userId,
    });
  }

  const entities = await getEntities();

  return {
    pageInfo: {
      totalCount: entities.length,
      hasMore: false,
    },
    nodes: entities,
  };
}
