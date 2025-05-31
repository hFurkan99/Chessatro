import type { Move } from "chess.js";
import type { Players } from "../types/Players";
import { pieceValues } from "../constants/chessPieces";

export const updateScore = (
  players: Players,
  move: Move,
  currentTurn: "w" | "b"
) => {
  if (!move.captured) return players;

  const capturedPiece = move.captured.toLowerCase();
  const value = pieceValues[capturedPiece] || 0;

  if (currentTurn === "b") {
    players.white = { ...players.white, score: players.white.score + value };
  } else {
    players.black = { ...players.black, score: players.black.score + value };
  }
  return players;
};
