import { CreateGameInput } from "../../generated";
import { Context } from "../../context";
import { UserEntity } from "../../../data-services";

interface GameMutationPartialPayload {
  errors: string[];
  currentUser: UserEntity;
}

export async function createGame(
  _: unknown,
  input: CreateGameInput,
  context: Context
): Promise<GameMutationPartialPayload> {
  const currentUser = await context.currentUser;
  if (!currentUser) throw new Error(`Must be logged in to create a game`);

  const db = await context.connection;
  await db.transaction((tx) => {
    return context.dataServices.Game.create({
      db: tx,
      ownerUserId: currentUser.id,
    });
  });

  return {
    errors: [],
    currentUser,
  };
}
