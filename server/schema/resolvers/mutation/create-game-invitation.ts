import { CreateGameInvitationInput } from "../../generated";
import { UserEntity } from "../../../data-services";
import { Context } from "../../context";

interface CreateGameInvitationPartialReturn {
  errors: string[];
  currentUser: UserEntity;
}

export async function createInvitation(
  _: unknown,
  input: CreateGameInvitationInput,
  context: Context
): Promise<CreateGameInvitationPartialReturn> {
  const currentUser = await context.currentUser;
  const db = await context.connection;
  const GameInvitation = context.dataServices.GameInvitation;

  if (!currentUser)
    throw new Error(`Must be logged in to create a game invitation`);

  const { gameId, toUserId } = input;
  const game = await context.getLoader("game").load(gameId);

  if (!game) {
    return {
      errors: [`Invalid game ${gameId}`],
      currentUser,
    };
  }

  const gameOwner = await context
    .getLoader("gamePlayer")
    .load(game.ownerUserId);

  if (!gameOwner) {
    return {
      errors: [
        `Game owner user ID ${game.ownerUserId} does not correlate a user we know about`,
      ],
      currentUser,
    };
  }

  if (currentUser.id !== gameOwner.userId) {
    return {
      errors: ["You can't invite players to games you don't own"],
      currentUser,
    };
  }

  const canCreate = await GameInvitation.canCreate({
    db,
    toUserId,
    fromUserId: currentUser.id,
    gameId,
  });
  if (!canCreate) {
    return {
      errors: ["User already invited. Wait for them to respond"],
      currentUser,
    };
  }

  const gameInvitation = await GameInvitation.create({
    db,
    fromUserId: currentUser.id,
    gameId,
    toUserId,
  });

  return {
    errors: [],
    currentUser,
  };
}
