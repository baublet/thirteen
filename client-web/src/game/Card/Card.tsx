import React from "react";

import { Card as CardType } from "../../../../shared/game-logic/game";
import { CardSuit, CardNumber } from ".";

interface CardProps {
  type: CardType;
}

function getSuitFromType(type: CardType): CardSuit {
  return "clubs";
}

function getNumberFromType(type: CardType): CardNumber {
  return "ace";
}

export function Card({ type }: CardProps) {
  const number = getSuitFromType(type);
  const suit = getNumberFromType(type);

  return (
    <div>
      <div>{number}</div>
      <div>{suit}</div>
      <div>{number}</div>
    </div>
  );
}
