import { GameEvent, GameBoard, GameEventType, PlayPayload } from "./game";
import allowPlay from "./event-validators/allow-play";

export default function allowEvent(
  { type, payload }: GameEvent,
  gameBoard: GameBoard
): boolean {
  switch (type) {
    case GameEventType.PLAY:
      return allowPlay(payload as PlayPayload, gameBoard);
  }
  return true;
}
