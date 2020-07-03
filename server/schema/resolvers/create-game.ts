import { CreateGameInput } from "../generated";
import { Context } from "../context";
import { GameEntity } from "../../data-services";

interface GameMutationPartialPayload {
  errors: string[];
  game: GameEntity;
}

export async function createGame(
  _: unknown,
  __: CreateGameInput,
  context: Context
): Promise<GameMutationPartialPayload> {
  const currentUser = await context.currentUser;
  if (!currentUser) throw new Error(`Must be logged in to create a game`);

  const db = await context.connection;
  const created = await db.transaction((tx) => {
    return context.dataServices.Game.create({
      db: tx,
      ownerUserId: currentUser.id,
    });
  });

  return {
    errors: [],
    game: created,
  };
}
