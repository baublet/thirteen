import buildBoard, {
  blankBoard
} from "./build-board";
import { Player, Set, Card, GameEventType } from "./game";

let id = 0;

const player = (): Player => {
  return {
    playerId: id++,
    hand: [Card.CLUBS_3]
  };
};

const players: Player[] = [player(), player(), player(), player()];

it("builds a board via a series of events", () => {
  buildBoard([
    {
      type: GameEventType.NEW_GAME,
      createdAt: 1,
      payload: {
        players
      }
    },
    {
      type: GameEventType.NEW_SET,
      createdAt: 2,
      payload: {
        set: Set.ONE
      }
    },
    {
      type: GameEventType.PLAY,
      createdAt: 3,
      payload: {
        playerId: players[0].playerId,
        cards: [Card.CLUBS_3]
      }
    },
    {
      type: GameEventType.PASS,
      createdAt: 4,
      payload: {
        playerId: players[1].playerId
      }
    }
  ]);
});
