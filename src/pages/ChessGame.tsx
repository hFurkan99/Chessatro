import styled from "styled-components";
import PlayerCard from "../features/PlayerCard/PlayerCard";
import ChessboardWrapper from "../features/Chessboard/ChessboardWrapper";
import { useGameStore } from "../store/gameStore";
import { useEffect } from "react";

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #06183d;
`;

const Center = styled.div`
  justify-content: center;
`;

const ChessGame = () => {
  const tickTime = useGameStore((state) => state.tickTime);
  const players = useGameStore((state) => state.players);
  const gameover = useGameStore((state) => state.gameOver);

  useEffect(() => {
    if (gameover) return;

    const interval = setInterval(() => {
      tickTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTime, gameover]);

  return (
    <Container>
      <PlayerCard player={players.white} />
      <Center>
        <ChessboardWrapper />
      </Center>
      <PlayerCard player={players.black} />
    </Container>
  );
};

export default ChessGame;
