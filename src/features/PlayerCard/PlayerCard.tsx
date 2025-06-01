import styled, { keyframes } from "styled-components";
import type { Player } from "../../types/Player";
import MovesList from "./MovesList";
import { useGameStore } from "../../store/gameStore";
import PlayerName from "./PlayerName";
import Timer from "./Timer";
import ScoreBadge from "./ScoreBadge";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4); }
  10% { box-shadow: 0 0 0 5px rgba(0, 255, 0, 0.2); }
  30% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
`;

const Card = styled.div<{ $isActive: boolean }>`
  background: #05041d;
  align-self: stretch;
  margin: 2.5rem;
  padding: 16px;
  border-radius: 8px;
  border: ${({ $isActive }) => ($isActive ? "3px solid green" : "none")};
  animation: ${({ $isActive }) => ($isActive ? pulse : "none")} 1.5s infinite;
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 1fr 6fr 1fr;
`;

interface Props {
  player: Player;
}

const PlayerCard = ({ player }: Props) => {
  const turn = useGameStore((state) => state.turn);
  const isPlaying =
    (player.isWhite && turn === "w") || (!player.isWhite && turn === "b");
  return (
    <Card $isActive={isPlaying}>
      <PlayerName name={player.name} />
      <Timer timeLeft={player.timeLeft} totalTime={60} />
      <MovesList moves={player.moves} />
      <ScoreBadge score={player.score} />
    </Card>
  );
};

export default PlayerCard;
