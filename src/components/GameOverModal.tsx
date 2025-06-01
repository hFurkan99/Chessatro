// components/GameOverModal.tsx
import styled from "styled-components";
import { useGameStore } from "../store/gameStore";
import { getGameOverMessage } from "../utils/getGameOverMessage";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 25%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 24px;
`;

const Button = styled.button`
  margin-top: 25px;
  background: #38a169;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background 0.3s;
  &:hover {
    background: #2f855a;
  }
`;

const GameOverModal = () => {
  const chess = useGameStore((state) => state.chess);
  const reset = useGameStore((state) => state.reset);
  const timeOutSide = useGameStore((state) => state.timeOutSide);
  const players = useGameStore((state) => state.players);

  const setGameOver = useGameStore((state) => state.setGameOver);

  const isGameOver = chess.isGameOver() || timeOutSide !== null;

  if (!isGameOver) return null;

  return (
    <Overlay>
      <Modal>
        <Title>Game Over</Title>
        <Description>
          {getGameOverMessage(chess, timeOutSide, players, setGameOver)}
        </Description>
        <Button onClick={reset}>Restart Game</Button>
      </Modal>
    </Overlay>
  );
};

export default GameOverModal;
