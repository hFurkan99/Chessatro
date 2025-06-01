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
  gameOver: boolean;
  move: (from: string, to: string) => boolean;
  tickTime: () => void;
  reset: () => void;
  timeOutSide: "w" | "b" | null;
  setTimeOutSide: (side: "w" | "b" | null) => void;
  setGameOver: (value: boolean) => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const chess = new Chess();
  return {
    chess,
    fen: chess.fen(),
    turn: chess.turn(),
    timeOutSide: null,
    gameOver: false,
    setGameOver: (value: boolean) => set({ gameOver: value }),
    setTimeOutSide: (side) => set({ timeOutSide: side }),
    players: {
      white: {
        name: "White Player",
        score: 0,
        isWhite: true,
        timeLeft: 60,
        moves: [],
      },
      black: {
        name: "Black Player",
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
        const newTime = Math.max(get().players.white.timeLeft - 1, 0);
        set((state) => ({
          players: {
            ...state.players,
            white: {
              ...state.players.white,
              timeLeft: newTime,
            },
          },
        }));
        if (newTime === 0) {
          set({ timeOutSide: "w" });
        }
      } else {
        const newTime = Math.max(get().players.black.timeLeft - 1, 0);
        set((state) => ({
          players: {
            ...state.players,
            black: {
              ...state.players.black,
              timeLeft: newTime,
            },
          },
        }));
        if (newTime === 0) {
          set({ timeOutSide: "b" });
        }
      }
    },

    reset: () =>
      set(() => {
        const chess = new Chess();
        return {
          chess,
          fen: chess.fen(),
          turn: "w",
          gameOver: false,
          players: {
            white: {
              name: "White Player",
              score: 0,
              isWhite: true,
              timeLeft: 60,
              moves: [],
            },
            black: {
              name: "Black Player",
              score: 0,
              isWhite: false,
              timeLeft: 60,
              moves: [],
            },
          },
          timeOutSide: null,
        };
      }),
  };
});
