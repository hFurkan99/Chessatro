import {
  pieceNames,
  pieceSymbols,
  pieceValues,
} from "../constants/chessPieces";
import type { MoveNotation } from "../types/MoveNotation";
import type { Players } from "../types/Players";

export const addMoveNotation = (
  players: Players,
  moveNotation: MoveNotation,
  currentTurn: "w" | "b"
) => {
  const pieceName = pieceNames[moveNotation.piece.toLowerCase()] || "Unknown";
  let notation = `${pieceName} from ${moveNotation.from.toUpperCase()} to ${moveNotation.to.toUpperCase()}`;

  if (moveNotation.captured) {
    const capturedName =
      pieceNames[moveNotation.captured.toLowerCase()] || "Unknown";

    const capturedPiece = moveNotation.captured.toLowerCase();

    const capturedValue = pieceValues[capturedPiece] || 0;
    const capturedSymbol = pieceSymbols[capturedPiece] || "Unknown";

    notation += ` (Captured ${capturedName} ${capturedSymbol}) (+${capturedValue} pts)`;
  }
  if (currentTurn === "b") {
    players.white = {
      ...players.white,
      moves: [...players.white.moves, notation],
    };
  } else {
    players.black = {
      ...players.black,
      moves: [...players.black.moves, notation],
    };
  }
  return players;
};
