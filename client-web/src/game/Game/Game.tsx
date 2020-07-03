import React from "react";

import { Game as GameState } from "../../../../shared/game-logic/game";

export function Game({
  id,
  losingPlayerIds,
  playedSets,
  playerTurn,
  players,
  winnerPlayerId,
}: GameState) {
  return <b>Hello World</b>;
}
