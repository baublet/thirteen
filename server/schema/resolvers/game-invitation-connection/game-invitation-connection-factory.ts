import { Context } from "../../context";

export async function gameInvitationConnectionFactory({
  context,
  toUserId,
}: {
  context: Context;
  toUserId?: number;
}) {
  const GameInvitation = context.dataServices.GameInvitation;
  if (!toUserId) {
    throw new Error(`Can't create a connection factory without any parameters`);
  }

  async function getEntities() {
    const db = await context.connection;
    return await GameInvitation.findByToUserId({
      db,
      toUserId: toUserId as number,
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
