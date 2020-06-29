import { GameConnectionPartial } from "../";
import { gameNodesResolverFactory } from "./game-nodes-resolver"

export async function games(): Promise<GameConnectionPartial> {
  console.log("Games called");
  return {
    pageInfo: {
      totalCount: 10,
      hasMore: true,
    },
    nodes: gameNodesResolverFactory([1, 2, 3]),
  };
}
