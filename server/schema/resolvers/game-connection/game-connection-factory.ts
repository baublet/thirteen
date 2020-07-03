import { Context } from "../../context";
import { GameEntity } from "../../../data-services";

export async function gameConnectionFactory({
  context,
  ownerUserId,
}: {
  context: Context;
  ownerUserId?: number;
}) {
  if (!ownerUserId) {
    throw new Error(`Can't create a connection factory without any parameters`);
  }

  async function getEntities() {
    const db = await context.connection;
    return await context.dataServices.Game.findByOwnerUserId({
      db,
      ownerUserId: ownerUserId as number,
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
