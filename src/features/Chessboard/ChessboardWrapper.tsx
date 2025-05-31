import { Chessboard } from "react-chessboard";
import { useGameStore } from "../../store/gameStore";

const ChessboardWrapper = () => {
  const fen = useGameStore((state) => state.fen);
  const move = useGameStore((state) => state.move);

  const onDrop = (source: string, target: string) => {
    return move(source, target);
  };
  return <Chessboard position={fen} onPieceDrop={onDrop} />;
};

export default ChessboardWrapper;
