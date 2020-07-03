import { Game } from "../../generated";

export function gameNodesResolverFactory(
  gameIds: number[]
): () => Promise<Game[]> {
  console.log("TRYING OT LOAD FOR PARENT: parent   ", gameIds);
  return async () => {
    return [
      {
        players: [],
        events: [],
      },
    ] as any;
  };
}
