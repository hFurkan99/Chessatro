import styled from "styled-components";
import PlayerCard from "../features/PlayerCard/PlayerCard";
import ChessboardWrapper from "../features/Chessboard/ChessboardWrapper";
import { useGameStore } from "../store/gameStore";
import { useEffect } from "react";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Center = styled.div`
  justify-content: center;
`;

const ChessGame = () => {
  const tickTime = useGameStore((state) => state.tickTime);
  const players = useGameStore((state) => state.players);

  useEffect(() => {
    const interval = setInterval(() => {
      tickTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTime]);

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
