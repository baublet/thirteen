import { GameEvent, GameEventType } from "../../../../shared/game-logic/game";

// Translates the game event type enum (e.g., new_game) into its constituent
// graphQL type (e.g., "NewGameEvent")
export function resolveGameEventType(
  event: GameEvent
):
  | "ConcedeEvent"
  | "GameOverEvent"
  | "NewGameEvent"
  | "NewSetEvent"
  | "PassEvent"
  | "PlayEvent" {
  const type = event.type;
  switch (type) {
    case GameEventType.CONCEDE:
      return "ConcedeEvent";
    case GameEventType.GAME_OVER:
      return "GameOverEvent";
    case GameEventType.NEW_GAME:
      return "NewGameEvent";
    case GameEventType.NEW_SET:
      return "NewSetEvent";
    case GameEventType.PASS:
      return "PassEvent";
    case GameEventType.PLAY:
      return "PlayEvent";
    default:
      throw new Error(`Unsupported event type: ${event.type}`);
  }
}
