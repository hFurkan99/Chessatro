import { create } from "zustand";
import { Chess } from "chess.js";
import type { Players } from "../types/Players";
import { updateScore } from "../utils/updateScore";
import { addMoveNotation } from "../utils/addMoveNotation";

interface GameState {
  chess: Chess;
  fen: string;
  turn: "w" | "b";
  players: Players;
  move: (from: string, to: string) => boolean;
  tickTime: () => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const chess = new Chess();
  return {
    chess,
    fen: chess.fen(),
    turn: chess.turn(),
    players: {
      white: {
        name: "Furkan",
        score: 0,
        isWhite: true,
        timeLeft: 60,
        moves: [],
      },
      black: {
        name: "Alperen",
        score: 0,
        isWhite: false,
        timeLeft: 60,
        moves: [],
      },
    },

    move: (from, to) => {
      const chess = get().chess;
      const move = chess.move({ from, to, promotion: "q" });
      if (!move) return false;

      let players = { ...get().players };
      players = updateScore(players, move, chess.turn());

      players = addMoveNotation(players, move, chess.turn());

      set({
        players,
        fen: chess.fen(),
        turn: chess.turn(),
        chess,
      });

      return true;
    },

    tickTime: () => {
      const turn = get().turn;

      if (turn === "w") {
        set((state) => ({
          players: {
            ...state.players,
            white: {
              ...state.players.white,
              timeLeft: Math.max(state.players.white.timeLeft - 1, 0),
            },
          },
        }));
      } else {
        set((state) => ({
          players: {
            ...state.players,
            black: {
              ...state.players.black,
              timeLeft: Math.max(state.players.black.timeLeft - 1, 0),
            },
          },
        }));
      }
    },
  };
});
