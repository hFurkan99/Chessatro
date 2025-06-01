import { Chessboard } from "react-chessboard";
import { useGameStore } from "../../store/gameStore";
import CheckAlert from "../../components/CheckAlert";
import GameOverModal from "../../components/GameOverModal";
import { useState } from "react";
import type { Square } from "chess.js";

const ChessboardWrapper = () => {
  const fen = useGameStore((state) => state.fen);
  const move = useGameStore((state) => state.move);
  const chess = useGameStore((state) => state.chess);
  const players = useGameStore((state) => state.players);
  const currentTurn = useGameStore((state) => state.turn);

  const playerInCheck = currentTurn === "w" ? players.white : players.black;

  const [moveSquares, setMoveSquares] = useState<
    Record<string, React.CSSProperties>
  >({});

  const onPieceDragStart = (sourceSquare: Square) => {
    const moves = chess.moves({ square: sourceSquare, verbose: true });

    const newSquares: Record<string, React.CSSProperties> = {};

    moves.forEach((move) => {
      if (move.captured) {
        // Yiyebileceği kare
        newSquares[move.to] = {
          background:
            "radial-gradient(circle, rgba(255, 0, 0, 0.5) 30%, transparent 30%)",
          borderRadius: "50%",
        };
      } else {
        // Normal kare
        newSquares[move.to] = {
          background:
            "radial-gradient(circle, rgba(0, 255, 0, 0.4) 20%, transparent 20%)",
          borderRadius: "50%",
        };
      }
    });

    setMoveSquares(newSquares);
  };

  const onDrop = (source: string, target: string) => {
    const moveResult = move(source, target);
    setMoveSquares({});
    return moveResult;
  };

  return (
    <>
      {!chess.isGameOver() && chess.inCheck() && (
        <CheckAlert playerName={playerInCheck.name} />
      )}
      <GameOverModal />
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        customDarkSquareStyle={{ backgroundColor: "#105672" }}
        customLightSquareStyle={{ backgroundColor: "#ffe6b8" }}
        onPieceDragBegin={(_, sourceSquare) => onPieceDragStart(sourceSquare)}
        customSquareStyles={moveSquares}
      />
    </>
  );
};

export default ChessboardWrapper;
