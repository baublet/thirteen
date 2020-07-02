import React from "react";

interface CardProps {
  number:
    | "ace"
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | "jack"
    | "queen"
    | "king";
  suit: "spades" | "clubs" | "diamonds" | "hearts";
}

export function Card({ number, suit }: CardProps) {
  return (
    <div>
      <div>{number}</div>
      <div>{suit}</div>
      <div>{number}</div>
    </div>
  );
}
