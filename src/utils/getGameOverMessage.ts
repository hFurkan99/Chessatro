import type { Chess, Piece } from "chess.js";
import { hasSufficientMatingMaterial } from "./hasSufficientMatingMaterial";
import type { Players } from "../types/Players";

export const getGameOverMessage = (
  chess: Chess,
  timeOutSide: "w" | "b" | null,
  players: Players
): string => {
  if (timeOutSide) {
    const winnerSide = timeOutSide === "w" ? "b" : "w";

    const pieces = chess
      .board()
      .flat()
      .map((p): Piece | null => {
        if (p === null) return null;
        return { type: p.type, color: p.color };
      })
      .filter((p): p is Piece => p !== null)
      .filter((p) => p.color === winnerSide)
      .map((p) => p.type);

    const hasMaterial = hasSufficientMatingMaterial(pieces);

    if (hasMaterial) {
      return `Time out! ${
        winnerSide === "w" ? "White" : "Black"
      } wins by timeout.`;
    } else {
      return `Time out! But insufficient mating material. Game drawn.`;
    }
  }

  if (chess.isCheckmate()) {
    const loser = chess.turn() === "w" ? "White" : "Black";
    return `${loser} has been checkmated!`;
  }

  if (
    chess.isStalemate() ||
    chess.isThreefoldRepetition() ||
    chess.isDrawByFiftyMoves() ||
    chess.isInsufficientMaterial()
  ) {
    const reason = getDrawReason(chess);

    if (players.white.score === players.black.score) {
      return `Draw by ${reason}.`;
    }

    if (players.white.score > players.black.score) {
      return `Draw by ${reason}, but White wins on score advantage (${players.white.score} vs ${players.black.score}).`;
    } else {
      return `Draw by ${reason}, but Black wins on score advantage (${players.black.score} vs ${players.white.score}).`;
    }
  }

  if (chess.isDraw()) return "Draw.";
  return "Game Over";
};

const getDrawReason = (chess: Chess): string => {
  if (chess.isStalemate()) return "stalemate";
  if (chess.isThreefoldRepetition()) return "threefold repetition";
  if (chess.isDrawByFiftyMoves()) return "50-move rule";
  if (chess.isInsufficientMaterial()) return "insufficient material";
  return "draw";
};
